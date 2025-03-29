import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "@graphql/context";
import { getPendingReviews } from "./get-pending-reviews";

@Resolver()
export class ReviewQueryResolver {
  @Authorized()
  @Query(() => [Number])
  getPendingReviews(@Ctx() ctx: AuthorizedContext) {
    return getPendingReviews(ctx);
  }
}
