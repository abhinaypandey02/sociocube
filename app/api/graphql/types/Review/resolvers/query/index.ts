import type { Context } from "@graphql/context";
import { Ctx, Query, Resolver } from "type-graphql";

import { getPendingReviews } from "./get-pending-reviews";

@Resolver()
export class ReviewQueryResolver {
  @Query(() => [Number])
  getPendingReviews(@Ctx() ctx: Context) {
    return getPendingReviews(ctx);
  }
}
