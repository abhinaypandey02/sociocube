import { FieldResolver, Resolver, Root } from "type-graphql";
import { desc, eq } from "drizzle-orm";
import { AgencyGQL } from "../../type";
import {
  getInstagramMedia,
  getInstagramStats,
} from "../../../User/resolvers/field/instagram";
import type { AgencyDB } from "../../db/schema";
import { InstagramMedia, InstagramStats } from "../../../Instagram/type";
import { Location, LocationID } from "../../../User/type";
import {
  getLocation,
  getLocationID,
} from "../../../User/resolvers/field/location";
import { PortfolioGQL } from "../../../Portfolio/type";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../../Portfolio/db/schema";
import { PostingGQL } from "../../../Posting/type";
import { PostingTable } from "../../../Posting/db/schema";

@Resolver(() => AgencyGQL)
export class AgencyFieldResolver {
  @FieldResolver(() => InstagramStats, { nullable: true })
  async instagramStats(@Root() user: AgencyDB): Promise<InstagramStats | null> {
    return getInstagramStats(user);
  }
  @FieldResolver(() => [InstagramMedia], { nullable: true })
  async instagramMedia(
    @Root() user: AgencyDB,
  ): Promise<InstagramMedia[] | null> {
    return getInstagramMedia(user, true);
  }

  @FieldResolver(() => LocationID, { nullable: true })
  async locationID(@Root() user: AgencyDB): Promise<LocationID | null> {
    return getLocationID(user);
  }

  @FieldResolver(() => Location, { nullable: true })
  async location(@Root() agency: AgencyDB): Promise<Location | null> {
    return getLocation(agency);
  }
  @FieldResolver(() => [PortfolioGQL])
  async portfolio(@Root() agency: AgencyDB): Promise<PortfolioGQL[]> {
    return db
      .select()
      .from(PortfolioTable)
      .where(eq(PortfolioTable.agency, agency.id));
  }
  @FieldResolver(() => [PostingGQL])
  async recentPostings(@Root() agency: AgencyDB): Promise<PostingGQL[]> {
    return db
      .select()
      .from(PostingTable)
      .where(eq(PostingTable.agency, agency.id))
      .orderBy(desc(PostingTable.open), desc(PostingTable.createdAt))
      .limit(3);
  }
}
