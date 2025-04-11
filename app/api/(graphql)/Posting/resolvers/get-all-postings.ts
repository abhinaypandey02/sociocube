import { Context } from "@backend/lib/auth/context";
import { Eligibility } from "@backend/lib/constants/eligibility";
import { db } from "@backend/lib/db";
import { withPagination } from "@backend/lib/utils/pagination";
import { ApplicationTable } from "@graphql/Application/db";
import { InstagramDetails } from "@graphql/Instagram/db";
import { PostingGQL } from "@graphql/Posting/type";
import { UserTable } from "@graphql/User/db";
import { getIsOnboarded } from "@graphql/User/resolvers/onboarding-data";
import { and, desc, eq, getTableColumns, isNull, lte, or } from "drizzle-orm";

import { getAge } from "@/constants/age";

import { PostingDB, PostingTable } from "../db";

export async function getValidPostings({
  userId,
  age,
  postingID,
  followers,
  page,
  pageSize,
}: {
  userId: number;
  age: number;
  followers: number;
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
            lte(PostingTable.minimumAge, age),
          ),
          eq(PostingTable.open, true),
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
      .orderBy(desc(ApplicationTable.id)),
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
      .innerJoin(
        InstagramDetails,
        eq(InstagramDetails.id, UserTable.instagramDetails),
      );
  }
  const isOnboarded = user ? getIsOnboarded(user.user) : false;
  const age = user?.user.dob ? getAge(new Date(user.user.dob)) : 0;
  if (postingID) {
    if (ctx.userId && isOnboarded) {
      results.push(
        ...(await getValidPostings({
          userId: ctx.userId,
          age,
          followers: user?.instagram_data.followers || 0,
          postingID,
        })),
      );
    } else {
      const [posting] = await db
        .select()
        .from(PostingTable)
        .where(eq(PostingTable.id, postingID));
      if (posting) results.push(posting);
    }
  }
  if (ctx.userId && isOnboarded) {
    results.push(
      ...(await getValidPostings({
        userId: ctx.userId,
        age,
        followers: user?.instagram_data.followers || 0,
        page,
        pageSize: 5 - results.length,
      })),
    );
  } else {
    results.push(
      ...(await withPagination(
        db.select().from(PostingTable).where(eq(PostingTable.open, true)),
        {
          page,
          pageSize: 5 - results.length,
        },
      )),
    );
  }
  const eligibility = (posting: PostingDB) => {
    if (!posting.open) return Eligibility.Closed;
    if (!ctx.userId || !user) return Eligibility.Unauthorized;
    if (!isOnboarded) return Eligibility.NotOnboarded;
    if (posting.minimumFollowers) {
      if (user.instagram_data.followers < posting.minimumFollowers)
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
