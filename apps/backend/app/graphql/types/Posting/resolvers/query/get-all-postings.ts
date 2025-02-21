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
  sql,
} from "drizzle-orm";
import { Field, InputType, registerEnumType } from "type-graphql";
import { MaxLength } from "class-validator";
import { NAME_MAX_LENGTH } from "commons/constraints";
import { PostingTable } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { PostingPlatforms } from "../../../../constants/platforms";
import { AgencyTable } from "../../../Agency/db/schema";
import { ApplicationTable } from "../../../Application/db/schema";

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
  paidOnly?: boolean;
  @Field({ nullable: true })
  followers?: number;
  @Field({ nullable: true })
  age?: number;
  @Field(() => [PostingPlatforms], { nullable: true })
  platforms?: PostingPlatforms[];
  @Field({ nullable: true })
  agency?: string;
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
export async function getAllPostings(filters: SearchPostingsFiltersInput) {
  return db
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
    .innerJoin(
      AgencyTable,
      and(
        eq(AgencyTable.id, PostingTable.agency),
        filters.agency ? eq(AgencyTable.username, filters.agency) : undefined,
        filters.query
          ? sql`(
            to_tsvector('english', ${PostingTable.title}) || 
            to_tsvector('english', ${PostingTable.description}) || 
            to_tsvector('english', ${AgencyTable.username}) || 
            to_tsvector('english', ${AgencyTable.name})
        ) @@ plainto_tsquery('english', ${filters.query})`
          : undefined,
      ),
    )
    .innerJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
    .groupBy(PostingTable.id)
    .orderBy(getOrderBy(filters.sortBy))
    .limit(10);
}
