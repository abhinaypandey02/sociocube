import {
  and,
  desc,
  eq,
  getTableColumns,
  gte,
  inArray,
  isNotNull,
  lte,
  sql,
} from "drizzle-orm";
import { Field, InputType, Int } from "type-graphql";
import { IsIn, Max, MaxLength, Min } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { AGE_RANGES } from "commons/age";
import { NAME_MAX_LENGTH } from "commons/constraints";
import { db } from "../../../../../../lib/db";
import { LocationTable, PricingTable, UserTable } from "../../db/schema";
import { InstagramDetails } from "../../../Instagram/db/schema";

@InputType("SearchSellersFilters")
export class SearchSellersFiltersInput {
  @Field({ nullable: true })
  @MaxLength(NAME_MAX_LENGTH)
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

export function handleSearchSellers(filters: SearchSellersFiltersInput) {
  const ageFromDate = new Date();
  const ageToDate = new Date();
  if (filters.ageRange) {
    const range = AGE_RANGES[filters.ageRange];
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
        isNotNull(UserTable.photo),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        filters.categories && inArray(UserTable.category, filters.categories),
        filters.genders && inArray(UserTable.gender, filters.genders),
        filters.followersFrom
          ? gte(InstagramDetails.followers, filters.followersFrom)
          : undefined,
        filters.followersTo
          ? lte(InstagramDetails.followers, filters.followersTo)
          : undefined,
        filters.ageRange || filters.ageRange === 0
          ? and(
              gte(UserTable.dob, ageFromDate.toDateString()),
              lte(UserTable.dob, ageToDate.toDateString()),
            )
          : undefined,
        filters.query
          ? sql`(
            to_tsvector('english', ${InstagramDetails.username}) || 
            to_tsvector('english', ${UserTable.name}) || 
            to_tsvector('english', ${UserTable.username}) || 
            to_tsvector('english', ${UserTable.bio})
        ) @@ to_tsquery('english', ${filters.query})`
          : undefined,
      ),
    )
    .innerJoin(
      LocationTable,
      and(
        eq(LocationTable.id, UserTable.location),
        filters.cities && inArray(LocationTable.city, filters.cities),
        filters.states && inArray(LocationTable.state, filters.states),
        filters.countries && inArray(LocationTable.country, filters.countries),
      ),
    )
    .leftJoin(PricingTable, and(eq(PricingTable.id, UserTable.pricing)))
    .where(
      and(
        filters.generalPriceFrom
          ? gte(PricingTable.starting, filters.generalPriceFrom)
          : undefined,
        filters.generalPriceTo
          ? lte(PricingTable.starting, filters.generalPriceTo)
          : undefined,
      ),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(12);
}
