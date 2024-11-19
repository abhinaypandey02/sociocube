import {
  and,
  or,
  eq,
  getTableColumns,
  gte,
  inArray,
  lte,
  sql,
  isNotNull,
} from "drizzle-orm";
import { Field, InputType, Int } from "type-graphql";
import { IsIn, Max, Min } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { AGE_RANGES } from "commons/age";
import { db } from "../../../../../../lib/db";
import { LocationTable, PricingTable, UserTable } from "../../db/schema";
import { InstagramDetails } from "../../../Instagram/db/schema";

@InputType("SearchSellers")
export class SearchSellersInput {
  @Field({ nullable: true })
  query?: string;
  @Field(() => [Int], { nullable: true })
  cities?: number[];
  @Field(() => [Int], { nullable: true })
  states?: number[];
  @Field(() => [Int], { nullable: true })
  countries?: number[];
  @Field(() => [String], { nullable: true })
  @IsIn(categories.map(({ title }) => title), { each: true })
  categories?: string[];
  @Field(() => [String], { nullable: true })
  @IsIn(genders, { each: true })
  genders?: string[];
  @Field(() => Int, { nullable: true })
  @Min(0)
  @Max(AGE_RANGES.length - 1)
  ageRange?: number;
  @Field(() => Int, { nullable: true })
  followersFrom?: number;
  @Field(() => Int, { nullable: true })
  followersTo?: number;
  @Field({ nullable: true })
  generalPriceFrom?: number;
  @Field({ nullable: true })
  generalPriceTo?: number;
}

export function handleSearchSellers(input: SearchSellersInput) {
  const ageFromDate = new Date();
  const ageToDate = new Date();
  if (input.ageRange) {
    const range = AGE_RANGES[input.ageRange];
    if (range) {
      ageFromDate.setFullYear(
        ageFromDate.getFullYear() - (range.maximum || 0) - 1,
      );
      ageToDate.setFullYear(ageToDate.getFullYear() - (range.minimum || 0));
    }
  }
  return db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .innerJoin(
      InstagramDetails,
      and(
        eq(InstagramDetails.id, UserTable.instagramDetails),
        or(eq(UserTable.isOnboarded, true), eq(UserTable.isSpirit, true)),
        isNotNull(UserTable.photo),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        input.categories && inArray(UserTable.category, input.categories),
        input.genders && inArray(UserTable.gender, input.genders),
        input.followersFrom
          ? gte(InstagramDetails.followers, input.followersFrom)
          : undefined,
        input.followersTo
          ? lte(InstagramDetails.followers, input.followersTo)
          : undefined,
        input.ageRange || input.ageRange === 0
          ? and(
              gte(UserTable.dob, ageFromDate.toDateString()),
              lte(UserTable.dob, ageToDate.toDateString()),
            )
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
    .innerJoin(
      LocationTable,
      and(
        eq(LocationTable.id, UserTable.location),
        input.cities && inArray(LocationTable.city, input.cities),
        input.states && inArray(LocationTable.state, input.states),
        input.countries && inArray(LocationTable.country, input.countries),
      ),
    )
    .leftJoin(PricingTable, and(eq(PricingTable.id, UserTable.pricing)))
    .where(
      and(
        input.generalPriceFrom
          ? gte(PricingTable.starting, input.generalPriceFrom)
          : undefined,
        input.generalPriceTo
          ? lte(PricingTable.starting, input.generalPriceTo)
          : undefined,
      ),
    )
    .limit(12);
}
