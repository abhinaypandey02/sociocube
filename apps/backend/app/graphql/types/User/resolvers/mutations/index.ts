import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { Currency } from "../../type";
import {
  handleUpdateOnboardingBasicDetails,
  UpdateBasicDetailsArgs,
} from "./onboarding/update-onboarding-basic-details";
import { handleCompleteOnboarding } from "./onboarding/complete-onboarding";
import { handleUpdateUser, UpdateUserArgs } from "./update-user";
import {
  handleUpdateOnboardingLocation,
  UpdateLocationArgs,
} from "./onboarding/update-onboarding-location";
import {
  handleUpdateOnboardingPricing,
  UpdatePricingArgs,
} from "./onboarding/update-onboarding-pricing";
import { handleDisconnectInstagram } from "./disconnect-instagram";
import { handleDisconnectGoogle } from "./disconnect-google";
import {
  handleUpdateLocation,
  UpdateLocationInput,
} from "./update-user-location";
import {
  handleUpdateOnboardingDOB,
  UpdateDateOfBirthArgs,
} from "./onboarding/update-onboarding-dob";
import {
  handleUpdateOnboardingUsername,
  UpdateOnboardingUsernameArgs,
} from "./onboarding/update-onboarding-username";

@Resolver()
export class UserMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingBasicDetails(
    @Arg("data") args: UpdateBasicDetailsArgs,
    @Ctx() ctx: Context,
  ) {
    return handleUpdateOnboardingBasicDetails(args, ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingDOB(
    @Arg("data") args: UpdateDateOfBirthArgs,
    @Ctx() ctx: Context,
  ) {
    return handleUpdateOnboardingDOB(args, ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingUsername(
    @Arg("data") args: UpdateOnboardingUsernameArgs,
    @Ctx() ctx: Context,
  ) {
    return handleUpdateOnboardingUsername(args, ctx);
  }
  @Authorized()
  @Mutation(() => Currency)
  updateOnboardingLocation(
    @Arg("data") args: UpdateLocationArgs,
    @Ctx() ctx: Context,
  ) {
    return handleUpdateOnboardingLocation(args, ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateOnboardingPricing(
    @Arg("data") args: UpdatePricingArgs,
    @Ctx() ctx: Context,
  ) {
    return handleUpdateOnboardingPricing(args, ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  completeOnboarding(@Ctx() ctx: Context) {
    return handleCompleteOnboarding(ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateUser(@Ctx() ctx: Context, @Arg("data") args: UpdateUserArgs) {
    return handleUpdateUser(ctx, args);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateUserLocation(
    @Ctx() ctx: Context,
    @Arg("data") args: UpdateLocationInput,
  ) {
    return handleUpdateLocation(ctx, args);
  }
  @Authorized()
  @Mutation(() => Boolean)
  disconnectInstagram(@Ctx() ctx: Context) {
    return handleDisconnectInstagram(ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  disconnectGoogle(@Ctx() ctx: Context) {
    return handleDisconnectGoogle(ctx);
  }
}
