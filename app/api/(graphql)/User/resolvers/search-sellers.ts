import { db } from "@backend/lib/db";
import { MaxLength } from "class-validator";
import {
  and,
  desc,
  eq,
  getTableColumns,
  isNotNull,
  notInArray,
} from "drizzle-orm";
import { Field, InputType } from "type-graphql";

import { Context } from "@/app/api/lib/auth/context";
import categories from "@/constants/categories";
import { BIO_MAX_LENGTH } from "@/constants/constraints";
import { getGroqResponse } from "@/lib/utils";

import { InstagramDetails } from "../../Instagram/db";
import { UserTable } from "../db";
import { UserSearchFilters } from "../type";
import { getFilteredUsers } from "../utils";

@InputType("SearchSellersFilters")
export class SearchSellersFiltersInput {
  @Field({ nullable: true })
  @MaxLength(BIO_MAX_LENGTH)
  query: string;
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
        notInArray(UserTable.id, [646, 320]),
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
  const filters = await getGroqResponse<UserSearchFilters>(PROMPT, query);
  if (!filters) return getDefaultCreators();
  return getFilteredUsers(filters, query);
}

const PROMPT = `Need to transform the given search query into the following JSON format
export class SearchSellersFiltersInput {
  niche?: string; // if the niche of the creator is specified in the query. (Ex- "Travel", "Fashion & Style", "Beauty & Makeup", "Lifestyle")
  cities?: string[]; // The names of the cities mentioned in the query if any. These should be full official names and NOT acronyms like NYC should be New York City, LA should be Los Angeles
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
  For location only put the narrowest location possible. If the city is provided then dont put its state or country. If a state is provided then dont put its country. For example if the query is "I want to find creators in New York" then the location should be New York City and state should be empty. If the query is "I want to find creators in New York State" then the location should be empty and state should be New York.
  
  If no details are provided about any field that return null. Don't try to make up any details.
`;
