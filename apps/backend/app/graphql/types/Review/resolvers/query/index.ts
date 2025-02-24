import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { ReviewGQL } from "../../type";
import type { AuthorizedContext } from "../../../../context";
import { getPendingReviews } from "./get-pending-reviews";
import { getPendingPortfolios } from "./get-pending-portfolios";

@Resolver()
export class ReviewQueryResolver {
  @Authorized()
  @Query(() => [Number])
  getPendingReviews(@Ctx() ctx: AuthorizedContext) {
    return getPendingReviews(ctx);
  }
  @Authorized()
  @Query(() => [ReviewGQL])
  getPendingPortfolios(@Ctx() ctx: AuthorizedContext) {
    return getPendingPortfolios(ctx);
  }
}
