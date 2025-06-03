import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";

import type { Context } from "../../lib/auth/context";
import { InstagramMedia, InstagramStats } from "../Instagram/type";
import { PortfolioGQL } from "../Portfolio/type";
import { ReviewGQL } from "../Review/type";
import type { UserDB } from "./db";
import { getInstagramMedia, getInstagramStats } from "./resolvers/instagram";
import { getLocation, getLocationID } from "./resolvers/location";
import { getIsOnboarded } from "./resolvers/onboarding-data";
import { getPortfolio } from "./resolvers/portfolio";
import { getPricing } from "./resolvers/pricing";
import { getReviews } from "./resolvers/review";
import { Location, LocationID, Pricing, UserGQL } from "./type";

@Resolver(() => UserGQL)
export class UserFieldResolver {
  @FieldResolver(() => Pricing, { nullable: true })
  async pricing(@Root() user: UserDB): Promise<Pricing | undefined> {
    return getPricing(user);
  }
  @FieldResolver(() => Location, { nullable: true })
  async location(@Root() user: UserDB): Promise<Location | null> {
    return getLocation(user);
  }
  @FieldResolver(() => LocationID, { nullable: true })
  async locationID(@Root() user: UserDB): Promise<LocationID | null> {
    return getLocationID(user);
  }

  @FieldResolver(() => Boolean)
  isOnboarded(@Root() user: UserDB): boolean {
    return getIsOnboarded(user);
  }

  @FieldResolver(() => InstagramStats, { nullable: true })
  async instagramStats(
    @Root() user: UserDB,
    @Ctx() ctx: Context,
  ): Promise<InstagramStats | null> {
    return getInstagramStats(user, ctx);
  }
  @FieldResolver(() => [InstagramMedia], { nullable: true })
  async instagramMedia(@Root() user: UserDB): Promise<InstagramMedia[]> {
    return getInstagramMedia(user);
  }
  @FieldResolver(() => [PortfolioGQL])
  async portfolio(@Root() user: UserDB): Promise<PortfolioGQL[]> {
    return getPortfolio(user);
  }
  @FieldResolver(() => [ReviewGQL])
  async reviews(@Root() user: UserDB): Promise<ReviewGQL[]> {
    return getReviews(user);
  }
}
