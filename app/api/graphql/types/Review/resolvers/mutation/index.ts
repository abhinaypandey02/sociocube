import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "@graphql/context";
import {
  sendReviewByAgency,
  SendReviewByAgencyArgs,
} from "./send-review-by-agency";
import { sendReviewByUser, SendReviewByUserArgs } from "./send-review-by-user";

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
}
