import { FieldResolver, Resolver, Root } from "type-graphql";
import { eq } from "drizzle-orm";
import { AgencyGQL } from "../../type";
import {
  getInstagramMedia,
  getInstagramStats,
} from "../../../User/resolvers/field/instagram";
import type { AgencyDB } from "../../db/schema";
import { InstagramMedia, InstagramStats } from "../../../Instagram/type";
import { Location } from "../../../User/type";
import { getLocation } from "../../../User/resolvers/field/location";
import { PortfolioGQL } from "../../../Portfolio/type";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../../Portfolio/db/schema";

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
  @FieldResolver(() => Location, { nullable: true })
  async location(@Root() agency: AgencyDB): Promise<Location | null> {
    return getLocation(agency);
  }
  @FieldResolver(() => [PortfolioGQL], { nullable: true })
  async portfolio(@Root() agency: AgencyDB): Promise<PortfolioGQL[] | null> {
    return db
      .select()
      .from(PortfolioTable)
      .where(eq(PortfolioTable.agency, agency.id));
  }
}
