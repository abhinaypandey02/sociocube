import {
  and,
  arrayOverlaps,
  count,
  desc,
  eq,
  getTableColumns,
  gte,
  isNotNull,
  isNull,
  lte,
  or,
} from "drizzle-orm";
import { Field, InputType, registerEnumType } from "type-graphql";
import { MaxLength } from "class-validator";
import { NAME_MAX_LENGTH, USERNAME_MAX_LENGTH } from "@/constants/constraints";
import { db } from "@backend/lib/db";
import { PostingPlatforms } from "@graphql/constants/platforms";
import type { PaginationArgs } from "@graphql/utils/pagination";
import { withPagination } from "@graphql/utils/pagination";
import { ApplicationTable } from "../../../Application/db/schema";
import { PostingTable } from "../../db/schema";

enum SearchPostingsSorting {
  PriceDesc = "PRICE_DESC",
  Trending = "TRENDING",
}

registerEnumType(SearchPostingsSorting, { name: "SearchPostingsSorting" });

@InputType("SearchPostingsFilters")
export class SearchPostingsFiltersInput {
  @Field({ nullable: true })
  @MaxLength(NAME_MAX_LENGTH)
  query?: string;
  @Field({ nullable: true })
  @MaxLength(USERNAME_MAX_LENGTH)
  agency?: string;
  @Field({ nullable: true })
  paidOnly?: boolean;
  @Field({ nullable: true })
  followers?: number;
  @Field({ nullable: true })
  age?: number;
  @Field(() => [PostingPlatforms], { nullable: true })
  platforms?: PostingPlatforms[];
  @Field(() => SearchPostingsSorting, { nullable: true })
  sortBy?: SearchPostingsSorting;
}

function getOrderBy(sortBy?: SearchPostingsSorting) {
  switch (sortBy) {
    case SearchPostingsSorting.PriceDesc:
      return desc(PostingTable.price);
    case SearchPostingsSorting.Trending:
      return desc(count(ApplicationTable.id));
    default:
      return desc(PostingTable.createdAt);
  }
}
export async function getAllPostings(
  filters: SearchPostingsFiltersInput,
  pagination: PaginationArgs,
) {
  return withPagination(
    db
      .select(getTableColumns(PostingTable))
      .from(PostingTable)
      .where(
        and(
          eq(PostingTable.open, true),

          filters.paidOnly ? eq(PostingTable.barter, false) : undefined,
          filters.sortBy === SearchPostingsSorting.PriceDesc
            ? isNotNull(PostingTable.price)
            : undefined,
          filters.platforms?.length
            ? arrayOverlaps(PostingTable.platforms, filters.platforms)
            : undefined,
          filters.followers
            ? or(
                isNull(PostingTable.minimumFollowers),
                lte(PostingTable.minimumFollowers, filters.followers),
              )
            : undefined,
          filters.age
            ? and(
                or(
                  isNull(PostingTable.minimumAge),
                  lte(PostingTable.minimumAge, filters.age),
                ),
                or(
                  isNull(PostingTable.maximumAge),
                  gte(PostingTable.maximumAge, filters.age),
                ),
              )
            : undefined,
        ),
      )
      .leftJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
      .groupBy(PostingTable.id)
      .orderBy(getOrderBy(filters.sortBy)),
    pagination,
  );
}
