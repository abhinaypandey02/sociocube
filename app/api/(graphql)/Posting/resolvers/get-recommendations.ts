import type { Context } from "@backend/lib/auth/context";
import { InstagramDetails } from "@graphql/Instagram/db";
import { SubscriptionTable } from "@graphql/Subscription/db";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { ObjectType } from "type-graphql";
import { Field } from "type-graphql";

import { db } from "@/app/api/lib/db";

import { ApplicationStatus, ApplicationTable } from "../../Application/db";
import { UserGQL } from "../../User/type";
import { getFilteredUsers } from "../../User/utils";
import { PostingDB } from "../db";

@ObjectType("Recommendation")
export class Recommendation {
  @Field(() => UserGQL)
  user: UserGQL;
  @Field({ nullable: true })
  status?: ApplicationStatus;
}

export async function getRecommendations(posting: PostingDB, ctx: Context) {
  if (!ctx.userId) return [];
  const [plan] = await db
    .select()
    .from(SubscriptionTable)
    .where(eq(SubscriptionTable.user, ctx.userId));

  if (!plan) {
    return [];
  }

  const users = await getFilteredUsers(
    {
      minimumAge: posting.minimumAge,
      maximumAge: posting.maximumAge,
      gender: posting.gender,
      followersFrom: posting.minimumFollowers,
      generalPriceTo: posting.price ? posting.price * 1.1 : undefined,
      strict: true,
      countryIDs: posting.countries,
      cityIDs: posting.cities,
      stateIDs: posting.states,
    },
    "",
    10,
    desc(sql`${InstagramDetails.er} * ${InstagramDetails.followers}`),
  );
  if (users.length < 10) {
    const moreUsers = await getFilteredUsers(
      {
        minimumAge: posting.minimumAge,
        maximumAge: posting.maximumAge,
        gender: posting.gender,
        followersFrom: posting.minimumFollowers,
        generalPriceTo: posting.price ? posting.price * 1.1 : undefined,
        countryIDs:
          posting.countries ||
          (posting.currencyCountry ? [posting.currencyCountry] : undefined),
        cityIDs: posting.cities,
        stateIDs: posting.states,
      },
      "",
      10,
      desc(sql`${InstagramDetails.er} * ${InstagramDetails.followers}`),
    );
    users.push(...moreUsers);
  }
  const applications = await db
    .select()
    .from(ApplicationTable)
    .where(
      and(
        eq(ApplicationTable.posting, posting.id),
        inArray(
          ApplicationTable.user,
          users.map((user) => user.id),
        ),
      ),
    );
  return users.map((user) => ({
    user,
    status: applications.find((application) => application.user === user.id)
      ?.status,
  }));
}
