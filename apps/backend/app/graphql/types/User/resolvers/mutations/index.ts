import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { Currency } from "../../type";
import {
  handleUpdateOnboardingBasicDetails,
  OnboardingBasicDetailsInput,
} from "./onboarding/update-onboarding-basic-details";
import { handleCompleteOnboarding } from "./onboarding/complete-onboarding";
import { handleUpdateUser, UpdateUserInput } from "./update-user";
import {
  handleUpdateOnboardingLocation,
  OnboardingLocationInput,
} from "./onboarding/update-onboarding-location";
import {
  handleUpdateOnboardingPricing,
  OnboardingPriceInput,
} from "./onboarding/update-onboarding-pricing";
import { handleDisconnectInstagram } from "./disconnect-instagram";
import {
  handleUpdateLocation,
  UpdateLocationInput,
} from "./update-user-location";
import {
  handleUpdateOnboardingDOB,
  OnboardingDOBInput,
} from "./onboarding/update-onboarding-dob";
import {
  handleUpdateOnboardingUsername,
  OnboardingUsernameInput,
} from "./onboarding/update-onboarding-username";
import { handleUpdateOnboardingInstagramUsername } from "./onboarding/update-onboarding-instagram-username";

@Resolver()
export class UserMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingInstagramUsername(
    @Arg("username") username: string,
    @Ctx() ctx: AuthorizedContext,
  ) {
    return handleUpdateOnboardingInstagramUsername(ctx, username);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingBasicDetails(
    @Arg("basicDetails") basicDetails: OnboardingBasicDetailsInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    return handleUpdateOnboardingBasicDetails(ctx, basicDetails);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingDOB(
    @Arg("dobDetails") dobDetails: OnboardingDOBInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    return handleUpdateOnboardingDOB(ctx, dobDetails);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingUsername(
    @Arg("usernameDetails")
    usernameDetails: OnboardingUsernameInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    return handleUpdateOnboardingUsername(ctx, usernameDetails);
  }
  @Authorized()
  @Mutation(() => Currency)
  updateOnboardingLocation(
    @Arg("locationDetails") locationDetails: OnboardingLocationInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    return handleUpdateOnboardingLocation(ctx, locationDetails);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingPricing(
    @Arg("pricingDetails") pricingDetails: OnboardingPriceInput,
    @Ctx() ctx: AuthorizedContext,
  ) {
    return handleUpdateOnboardingPricing(ctx, pricingDetails);
  }
  @Authorized()
  @Mutation(() => Boolean)
  completeOnboarding(@Ctx() ctx: AuthorizedContext) {
    return handleCompleteOnboarding(ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateUser(
    @Ctx() ctx: AuthorizedContext,
    @Arg("updatedUser") updatedUser: UpdateUserInput,
  ) {
    return handleUpdateUser(ctx, updatedUser);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateUserLocation(
    @Ctx() ctx: AuthorizedContext,
    @Arg("updatedLocation") updatedLocation: UpdateLocationInput,
  ) {
    return handleUpdateLocation(ctx, updatedLocation);
  }
  @Authorized()
  @Mutation(() => Boolean)
  disconnectInstagram(@Ctx() ctx: AuthorizedContext) {
    return handleDisconnectInstagram(ctx);
  }
}
