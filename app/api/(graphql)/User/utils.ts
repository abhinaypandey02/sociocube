import { db, DBTransaction } from "@backend/lib/db";
import {
  and,
  desc,
  eq,
  getTableColumns,
  gt,
  gte,
  inArray,
  isNotNull,
  lte,
  or,
  type SQL,
  sql,
} from "drizzle-orm";

import { USERNAME_REGEX } from "@/constants/regex";
import { SearchResultsLength, SubscriptionPlan } from "@/lib/usages";

import type { Context } from "../../lib/auth/context";
import { InstagramDetails } from "../Instagram/db";
import { CityTable, CountryTable, StateTable } from "../Map/db";
import {
  LocationTable,
  PricingTable,
  type UserDBInsert,
  UserTable,
} from "./db";
import { UserSearchFilters } from "./type";

export async function getUser(filter: SQL, tx?: DBTransaction) {
  const [user] = await (tx || db).select().from(UserTable).where(filter);
  return user;
}

export async function createUser(data: UserDBInsert, tx?: DBTransaction) {
  const [user] = await (tx || db)
    .insert(UserTable)
    .values(data)
    .returning({ id: UserTable.id });
  return user;
}

export const getCurrentUser = (ctx: Context) => {
  if (!ctx.userId) return null;
  return getUser(eq(UserTable.id, ctx.userId));
};

export function usernameAllowed(username: string) {
  return USERNAME_REGEX.test(username);
}

export async function getFilteredUsers(
  filters: UserSearchFilters,
  query: string,
  limit: number = SearchResultsLength[SubscriptionPlan.Free],
  orderBy?: SQL,
) {
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

  let countries: number[] = filters.countryIDs || [],
    cities: number[] = filters.cityIDs || [],
    states: number[] = filters.stateIDs || [];

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
    const res = await db
      .select({ id: CityTable.id, name: CityTable.name })
      .from(CityTable).where(sql`EXISTS (
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
  const filterHasValues = Object.values(filters).some((value) => value);
  const sqlQuery = db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .where(
      and(
        isNotNull(UserTable.photo),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        ageFromDate
          ? lte(UserTable.dob, ageFromDate.toDateString())
          : undefined,
        ageToDate ? gte(UserTable.dob, ageToDate.toDateString()) : undefined,
      ),
    )
    .innerJoin(
      InstagramDetails,
      and(
        eq(InstagramDetails.id, UserTable.instagramDetails),
        filters.strict ? gt(InstagramDetails.er, 0) : undefined,
        filters.gender ? eq(UserTable.gender, filters.gender) : undefined,
        filters.followersFrom
          ? gte(InstagramDetails.followers, filters.followersFrom)
          : undefined,
        filters.followersTo
          ? lte(InstagramDetails.followers, filters.followersTo)
          : undefined,
        filters.niche ? eq(UserTable.category, filters.niche) : undefined,
        !filterHasValues
          ? or(
              sql`${UserTable.username} % ${query}`,
              sql`${InstagramDetails.username} % ${query}`,
              sql`${UserTable.name} % ${query}`,
              sql`${UserTable.bio} % ${query}`,
            )
          : undefined,
      ),
    )
    .orderBy(orderBy || desc(InstagramDetails.followers))
    .limit(limit);
  if (countries.length || cities.length || states.length) {
    sqlQuery.innerJoin(
      LocationTable,
      and(
        eq(LocationTable.id, UserTable.location),
        states.length
          ? undefined
          : or(
              countries.length
                ? inArray(LocationTable.country, countries)
                : undefined,
              cities.length ? inArray(LocationTable.city, cities) : undefined,
            ),
      ),
    );
    if (states.length) {
      sqlQuery.innerJoin(
        CityTable,
        and(
          eq(LocationTable.city, CityTable.id),
          or(
            countries.length
              ? inArray(LocationTable.country, countries)
              : undefined,
            cities.length ? inArray(LocationTable.city, cities) : undefined,
            inArray(CityTable.stateId, states),
          ),
        ),
      );
    }
  }
  if (filters.generalPriceFrom || filters.generalPriceTo) {
    if (filters.strict) {
      sqlQuery.innerJoin(
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
    } else
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
