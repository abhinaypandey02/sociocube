import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { UserGQL } from "../../type";
import type { Context } from "../../../../context";
import {
  handleUpdateOnboardingBuyerBasicDetails,
  UpdateBuyerBasicDetailsArgs,
} from "./onboarding/update-onboarding-buyer-basic-details";

@Resolver()
export class UserMutationResolver {
  @Authorized()
  @Mutation(() => UserGQL)
  updateOnboardingBuyerBasicDetails(
    @Arg("data") args: UpdateBuyerBasicDetailsArgs,
    @Ctx() ctx: Context,
  ) {
    return handleUpdateOnboardingBuyerBasicDetails(args, ctx);
  }
}
