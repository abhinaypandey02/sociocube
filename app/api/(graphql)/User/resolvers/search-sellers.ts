import { db } from "@backend/lib/db";
import { MaxLength } from "class-validator";
import {
  and,
  desc,
  eq,
  getTableColumns,
  gte,
  inArray,
  isNotNull,
  lte,
  or,
  sql,
} from "drizzle-orm";
import { Field, InputType } from "type-graphql";

import { Context } from "@/app/api/lib/auth/context";
import categories from "@/constants/categories";
import { BIO_MAX_LENGTH } from "@/constants/constraints";
import { getGroqResponse } from "@/lib/utils";

import { InstagramDetails } from "../../Instagram/db";
import { CityTable, CountryTable, StateTable } from "../../Map/db";
import { LocationTable, PricingTable, UserTable } from "../db";

@InputType("SearchSellersFilters")
export class SearchSellersFiltersInput {
  @Field({ nullable: true })
  @MaxLength(BIO_MAX_LENGTH)
  query: string;
}

interface TransformedSearchResponse {
  niche?: string;
  cities?: string[];
  states?: string[];
  countries?: string[];
  gender?: string;
  minimumAge?: number;
  maximumAge?: number;
  followersFrom?: number;
  followersTo?: number;
  generalPriceFrom?: number;
  generalPriceTo?: number;
}

function getDefaultCreators() {
  return db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .where(
      and(
        isNotNull(UserTable.photo),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        isNotNull(UserTable.location),
      ),
    )
    .innerJoin(
      LocationTable,
      and(
        eq(UserTable.location, LocationTable.id),
        eq(LocationTable.country, 233),
      ),
    )
    .innerJoin(
      InstagramDetails,
      eq(UserTable.instagramDetails, InstagramDetails.id),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(5);
}

export async function handleSearchSellers(
  ctx: Context,
  { query }: SearchSellersFiltersInput,
) {
  if (!query || !ctx.userId) return getDefaultCreators();
  const filters = await getGroqResponse<TransformedSearchResponse>(
    PROMPT,
    query,
  );
  if (!filters) return getDefaultCreators();
  let ageFromDate: Date | undefined = undefined;
  let ageToDate: Date | undefined = undefined;
  if (filters.minimumAge) {
    ageFromDate = new Date();
    ageFromDate.setFullYear(ageFromDate.getFullYear() - filters.minimumAge - 1);
  }
  if (filters.maximumAge) {
    ageToDate = new Date();
    ageToDate.setFullYear(ageToDate.getFullYear() - filters.maximumAge - 1);
  }
  let countries: number[] = [],
    cities: number[] = [],
    states: number[] = [];

  if (filters.countries?.length) {
    const res = await db.select({ id: CountryTable.id }).from(CountryTable)
      .where(sql`EXISTS (
          SELECT 1
          FROM unnest(${sql.raw(`ARRAY[${filters.countries.map((c) => `'${c}'`).join(", ")}]`)}) AS city_input
          WHERE noaccent(${CountryTable.iso2}) % noaccent(city_input)
        )`);
    countries = res.map(({ id }) => id);
  }
  if (filters.cities?.length) {
    const res = await db.select({ id: CityTable.id }).from(CityTable)
      .where(sql`EXISTS (
          SELECT 1
          FROM unnest(${sql.raw(`ARRAY[${filters.cities.map((c) => `'${c}'`).join(", ")}]`)}) AS city_input
          WHERE noaccent(${CityTable.name}) % noaccent(city_input)
        )`);
    cities = res.map(({ id }) => id);
  }
  if (filters.states?.length) {
    const res = await db.select({ id: StateTable.id }).from(StateTable)
      .where(sql`EXISTS (
          SELECT 1
          FROM unnest(${sql.raw(`ARRAY[${filters.states.map((c) => `'${c}'`).join(", ")}]`)}) AS city_input
          WHERE noaccent(${StateTable.name}) % noaccent(city_input)
        )`);
    states = res.map(({ id }) => id);
  }
  const sqlQuery = db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .where(
      and(
        isNotNull(UserTable.photo),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        ageFromDate
          ? gte(UserTable.dob, ageFromDate.toDateString())
          : undefined,
        ageToDate ? lte(UserTable.dob, ageToDate.toDateString()) : undefined,
      ),
    )
    .innerJoin(
      InstagramDetails,
      and(
        eq(InstagramDetails.id, UserTable.instagramDetails),
        filters.gender ? eq(UserTable.gender, filters.gender) : undefined,
        filters.followersFrom
          ? gte(InstagramDetails.followers, filters.followersFrom)
          : undefined,
        filters.followersTo
          ? lte(InstagramDetails.followers, filters.followersTo)
          : undefined,
        filters.niche
          ? sql`immutable_categories(${UserTable.category}) % ${filters.niche}`
          : undefined,
        or(
          sql`${UserTable.username} % ${query}`,
          sql`${InstagramDetails.username} % ${query}`,
          sql`${UserTable.name} % ${query}`,
          sql`${UserTable.bio} % ${query}`,
        ),
      ),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(5);
  if (countries.length || cities.length || states.length) {
    sqlQuery.innerJoin(
      LocationTable,
      and(
        eq(LocationTable.id, UserTable.location),
        countries.length
          ? inArray(LocationTable.country, countries)
          : undefined,
        cities.length ? inArray(LocationTable.city, cities) : undefined,
        states.length ? inArray(LocationTable.country, countries) : undefined,
      ),
    );
    if (states.length) {
      sqlQuery.innerJoin(
        CityTable,
        and(
          eq(LocationTable.city, CityTable.id),
          inArray(CityTable.stateId, states),
        ),
      );
    }
  }
  if (filters.generalPriceFrom || filters.generalPriceTo) {
    sqlQuery.leftJoin(
      PricingTable,
      and(
        eq(PricingTable.user, UserTable.id),

        filters.generalPriceFrom
          ? gte(PricingTable.starting, filters.generalPriceFrom)
          : undefined,
        filters.generalPriceTo
          ? lte(PricingTable.starting, filters.generalPriceTo)
          : undefined,
      ),
    );
  }
  return sqlQuery;
}

const PROMPT = `Need to transform the given search query into the following JSON format
export class SearchSellersFiltersInput {
  niche?: string; // if the niche of the creator is specified in the query. (Ex- "Travel", "Beauty", "education", "Business")
  cities?: string[]; // The names of the cities mentioned in the query if any. These should be full official names and NOT acronyms like NYC, LA
  states?: string[]; // The names of the states mentioned in the query if any. These should be full official names and NOT acronyms like NYC, LA
  countries?: string[]; // The ISO2 code of the country mentioned in the query if any.
  gender?: string; // Only if provided. One of "Male" or "Female" 
  minimumAge?: number; // can only be multiples of 5
  maximumAge?: number; // can only be multiples of 5
  followersFrom?: number;
  followersTo?: number;
  generalPriceFrom?: number;
  generalPriceTo?: number;
}

  niche can be one of ${categories.map(({ title }) => title).join(",")}

  For age, followers, price ranges: If any details are provided about age group or follower range or price then add a relaxed range

  If no details are provided about any field that return undefined. Don't try to make up any details.
`;
