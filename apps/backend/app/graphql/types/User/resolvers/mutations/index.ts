import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import {
  handleUpdateOnboardingBasicDetails,
  UpdateBasicDetailsArgs,
} from "./onboarding/update-onboarding-basic-details";
import { handleCompleteOnboarding } from "./onboarding/complete-onboarding";
import { handleUpdateUser, UpdateUserArgs } from "./update-user";

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
  completeOnboarding(@Ctx() ctx: Context) {
    return handleCompleteOnboarding(ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateUser(@Ctx() ctx: Context, @Arg("data") args: UpdateUserArgs) {
    return handleUpdateUser(ctx, args);
  }
}
