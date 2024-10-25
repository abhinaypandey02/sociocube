import {
  and,
  arrayOverlaps,
  eq,
  getTableColumns,
  gte,
  inArray,
  lte,
  sql,
} from "drizzle-orm";
import { Field, InputType, Int } from "type-graphql";
import { IsIn } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import { InstagramDetails } from "../../../Instagram/db/schema";
import { AuthScopes } from "../../../../constants/scopes";

@InputType("SearchSellers")
export class SearchSellersInput {
  @Field({ nullable: true })
  query?: string;
  @Field(() => [String], { nullable: true })
  @IsIn(categories.map(({ title }) => title), { each: true })
  categories?: string[];
  @Field(() => [String], { nullable: true })
  @IsIn(genders, { each: true })
  genders?: string[];
  @Field(() => Int, { nullable: true })
  ageFrom?: number;
  @Field(() => Int, { nullable: true })
  ageTo?: number;
  @Field(() => Int, { nullable: true })
  followersFrom?: number;
  @Field(() => Int, { nullable: true })
  followersTo?: number;
}

export function handleSearchSellers(input: SearchSellersInput) {
  const ageFromDate = new Date();
  ageFromDate.setFullYear(ageFromDate.getFullYear() - (input.ageTo || 0) - 1);
  const ageToDate = new Date();
  ageToDate.setFullYear(ageToDate.getFullYear() - (input.ageFrom || 0));

  return db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .innerJoin(
      InstagramDetails,
      and(
        eq(InstagramDetails.id, UserTable.instagramDetails),
        eq(UserTable.isOnboarded, true),
        arrayOverlaps(UserTable.scopes, [AuthScopes.INSTAGRAM]),
        input.categories && inArray(UserTable.category, input.categories),
        input.genders && inArray(UserTable.gender, input.genders),
        input.followersFrom
          ? gte(InstagramDetails.followers, input.followersFrom)
          : undefined,
        input.followersTo
          ? lte(InstagramDetails.followers, input.followersTo)
          : undefined,
        input.ageTo
          ? gte(UserTable.dob, ageFromDate.toDateString())
          : undefined,
        input.ageFrom
          ? lte(UserTable.dob, ageToDate.toDateString())
          : undefined,
        input.query
          ? sql`(
            to_tsvector('english', ${InstagramDetails.username}) || 
            to_tsvector('english', ${UserTable.name}) || 
            to_tsvector('english', ${UserTable.bio})
        ) @@ to_tsquery('english', ${input.query})`
          : undefined,
      ),
    )
    .limit(10);
}
