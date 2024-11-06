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
}
