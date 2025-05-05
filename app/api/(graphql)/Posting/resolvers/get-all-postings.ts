import { Context } from "@backend/lib/auth/context";
import { Eligibility } from "@backend/lib/constants/eligibility";
import { db } from "@backend/lib/db";
import { withPagination } from "@backend/lib/utils/pagination";
import { ApplicationTable } from "@graphql/Application/db";
import { InstagramDetails } from "@graphql/Instagram/db";
import { PostingGQL } from "@graphql/Posting/type";
import { LocationTable, UserTable } from "@graphql/User/db";
import { getIsOnboarded } from "@graphql/User/resolvers/onboarding-data";
import {
  and,
  arrayContains,
  desc,
  eq,
  getTableColumns,
  gte,
  isNull,
  lte,
  or,
} from "drizzle-orm";

import { Roles } from "@/app/api/lib/constants/roles";
import { getAge } from "@/constants/age";

import { CityTable } from "../../Map/db";
import { PostingDB, PostingTable } from "../db";

export async function getValidPostings({
  userId,
  age,
  postingID,
  gender,
  country,
  city,
  state,
  followers,
  page,
  pageSize,
}: {
  userId: number;
  age: number;
  followers: number;
  gender: string | null;
  country: number;
  city: number;
  state: number;
  page?: number;
  pageSize?: number;
  postingID?: number;
}) {
  return withPagination(
    db
      .select({
        ...getTableColumns(PostingTable),
        hasApplied: ApplicationTable.id,
      })
      .from(PostingTable)
      .where(
        and(
          ...(gender
            ? [or(isNull(PostingTable.gender), eq(PostingTable.gender, gender))]
            : []),
          or(
            and(
              isNull(PostingTable.countries),
              isNull(PostingTable.cities),
              isNull(PostingTable.states),
            ),
            arrayContains(PostingTable.countries, [country]),
            arrayContains(PostingTable.cities, [city]),
            arrayContains(PostingTable.states, [state]),
          ),
          or(
            isNull(PostingTable.minimumFollowers),
            lte(PostingTable.minimumFollowers, followers),
          ),
          or(
            isNull(PostingTable.minimumAge),
            lte(PostingTable.minimumAge, age),
          ),
          or(
            isNull(PostingTable.maximumAge),
            gte(PostingTable.maximumAge, age),
          ),
          eq(PostingTable.open, true),
          eq(PostingTable.inReview, false),
          postingID ? eq(PostingTable.id, postingID) : undefined,
        ),
      )
      .leftJoin(
        ApplicationTable,
        and(
          eq(ApplicationTable.user, userId),
          eq(ApplicationTable.posting, PostingTable.id),
        ),
      )
      .groupBy(PostingTable.id, ApplicationTable.id)
      .orderBy(desc(ApplicationTable.id), desc(PostingTable.id)),
    {
      page: page ?? 1,
      pageSize: pageSize ?? 1,
    },
  );
}

export async function getAllPostings(
  ctx: Context,
  page: number,
  postingID?: number,
): Promise<PostingGQL[]> {
  const results: PostingDB[] = [];
  let user = null;
  if (ctx.userId) {
    [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, ctx.userId))
      .innerJoin(LocationTable, eq(LocationTable.id, UserTable.location))
      .innerJoin(CityTable, eq(CityTable.id, LocationTable.city))
      .leftJoin(
        InstagramDetails,
        eq(InstagramDetails.id, UserTable.instagramDetails),
      );
  }
  const isOnboarded = user ? getIsOnboarded(user.user) : false;
  const age = user?.user.dob ? getAge(new Date(user.user.dob)) : 0;
  if (postingID) {
    const [posting] = await db
      .select()
      .from(PostingTable)
      .where(eq(PostingTable.id, postingID));

    if (posting) results.push(posting);
  }
  if (ctx.userId && isOnboarded && user) {
    results.push(
      ...(await getValidPostings({
        userId: ctx.userId,
        age,
        followers: user?.instagram_data?.followers || 0,
        gender: user?.user.gender,
        country: user?.location?.country || 0,
        city: user?.location?.city || 0,
        state: user?.cities?.stateId || 0,
        page,
        pageSize: 5 - results.length,
      })),
    );
  } else {
    results.push(
      ...(await withPagination(
        db
          .select()
          .from(PostingTable)
          .where(
            and(eq(PostingTable.open, true), eq(PostingTable.inReview, false)),
          )
          .orderBy(desc(PostingTable.id)),
        {
          page,
          pageSize: 5 - results.length,
        },
      )),
    );
  }
  const eligibility = (posting: PostingDB) => {
    if (!posting.open) return Eligibility.Closed;
    if (!ctx.userId) return Eligibility.Unauthorized;
    if (!isOnboarded || !user) return Eligibility.NotOnboarded;
    if (user.user.role !== Roles.Creator) return Eligibility.NotCreator;
    if (posting.gender && user.user.gender !== posting.gender)
      return Eligibility.GenderMismatch;
    if (
      (posting.countries || posting.cities || posting.states) &&
      !posting.countries?.includes(user.location?.country || 0) &&
      !posting.cities?.includes(user.location?.city || 0) &&
      !posting.states?.includes(user.cities?.stateId || 0)
    ) {
      return Eligibility.LocationMismatch;
    }
    if (posting.minimumFollowers) {
      if ((user.instagram_data?.followers || 0) < posting.minimumFollowers)
        return Eligibility.LessFollowers;
    }
    if (posting.minimumAge || posting.minimumAge) {
      if (age < (posting.minimumAge || 0) || age > (posting.maximumAge || 1000))
        return Eligibility.NotAgeGroup;
    }
    return Eligibility.Eligible;
  };
  return results.map((posting) => ({
    ...posting,
    eligibility: eligibility(posting),
  }));
}
