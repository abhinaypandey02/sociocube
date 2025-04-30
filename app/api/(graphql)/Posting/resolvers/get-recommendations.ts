import { InstagramDetails } from "@graphql/Instagram/db";
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

export async function getRecommendations(posting: PostingDB) {
  const users = await getFilteredUsers(
    {
      minimumAge: posting.minimumAge,
      maximumAge: posting.maximumAge,
      gender: posting.gender,
      followersFrom: posting.minimumFollowers,
      generalPriceTo: posting.price ? posting.price * 1.1 : undefined,
      countryIDs: posting.countries,
      cityIDs: posting.cities,
      stateIDs: posting.states,
    },
    10,
    desc(sql`${InstagramDetails.er} * ${InstagramDetails.followers}`),
  );
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
