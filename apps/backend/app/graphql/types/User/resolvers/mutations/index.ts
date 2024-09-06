import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import {
  handleUpdateOnboardingBasicDetails,
  UpdateBasicDetailsArgs,
} from "./onboarding/update-onboarding-basic-details";
import { handleCompleteOnboarding } from "./onboarding/complete-onboarding";

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
}
