import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import {
  sendReviewByAgency,
  SendReviewByAgencyArgs,
} from "./send-review-by-agency";
import { sendReviewByUser, SendReviewByUserArgs } from "./send-review-by-user";
import { acceptPortfolio } from "./accept-portfolio";
import { rejectPortfolio } from "./reject-portfolio";

@Resolver()
export class ReviewMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  sendReviewByAgency(
    @Ctx() ctx: AuthorizedContext,
    @Arg("args") args: SendReviewByAgencyArgs,
  ) {
    return sendReviewByAgency(ctx, args);
  }
  @Authorized()
  @Mutation(() => Boolean)
  sendReviewByUser(
    @Ctx() ctx: AuthorizedContext,
    @Arg("args") args: SendReviewByUserArgs,
  ) {
    return sendReviewByUser(ctx, args);
  }
  @Authorized()
  @Mutation(() => Boolean)
  acceptPortfolio(
    @Ctx() ctx: AuthorizedContext,
    @Arg("review") reviewID: number,
  ) {
    return acceptPortfolio(ctx, reviewID);
  }
  @Authorized()
  @Mutation(() => Boolean)
  rejectPortfolio(
    @Ctx() ctx: AuthorizedContext,
    @Arg("review") reviewID: number,
  ) {
    return rejectPortfolio(ctx, reviewID);
  }
}
