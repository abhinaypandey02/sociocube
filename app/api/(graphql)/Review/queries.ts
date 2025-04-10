import type { Context } from "@backend/lib/auth/context";
import { Ctx, Query, Resolver } from "type-graphql";

import { getPendingReviews } from "./resolvers/get-pending-reviews";

@Resolver()
export class ReviewQueryResolver {
  @Query(() => [Number])
  getPendingReviews(@Ctx() ctx: Context) {
    return getPendingReviews(ctx);
  }
}
