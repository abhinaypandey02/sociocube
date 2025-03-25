import {Authorized, FieldResolver, Resolver, Root} from "type-graphql";
import {Location, LocationID, Pricing, UserGQL} from "../../type";
import type {UserDB} from "../../db/schema";
import {FileGQL} from "../../../File/type";
import {InstagramMedia, InstagramStats} from "../../../Instagram/type";
import {PortfolioGQL} from "../../../Portfolio/type";
import {AgencyMemberGQL, AgencyOnboardingGQL} from "../../../Agency/type";
import {ReviewGQL} from "../../../Review/type";
import {getIsOnboarded} from "./onboarding-data";
import {getPictureUploadURL} from "./picture-upload-url";
import {getPricing} from "./pricing";
import {getLocation, getLocationID} from "./location";
import {getInstagramMedia, getInstagramStats} from "./instagram";
import {getPortfolio} from "./portfolio";
import {getAgencies, getOnboardingAgency} from "./agency";
import {getReviews} from "./review";

@Resolver(() => UserGQL)
export class UserFieldResolver {
  @Authorized()
  @FieldResolver(() => AgencyOnboardingGQL, { nullable: true })
  async onboardingAgency(
    @Root() user: UserDB,
  ): Promise<AgencyOnboardingGQL | undefined | null> {
    return getOnboardingAgency(user);
  }

  @Authorized()
  @FieldResolver(() => [AgencyMemberGQL])
  async agencies(@Root() user: UserDB): Promise<AgencyMemberGQL[]> {
    return getAgencies(user);
  }
  @Authorized()
  @FieldResolver(() => FileGQL)
  async pictureUploadURL(@Root() user: UserDB): Promise<FileGQL> {
    return getPictureUploadURL(user);
  }

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
  async instagramStats(@Root() user: UserDB): Promise<InstagramStats | null> {
    return getInstagramStats(user);
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
