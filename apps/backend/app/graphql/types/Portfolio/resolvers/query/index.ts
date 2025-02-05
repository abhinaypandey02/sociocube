import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { PortfolioGQL } from "../../type";
import type { AuthorizedContext } from "../../../../context";
import { getUserPortfolio } from "./get-user-portfolio";

@Resolver()
export class PortfolioQueryResolver {
  @Authorized()
  @Query(() => [PortfolioGQL])
  getUserPortfolio(@Ctx() ctx: AuthorizedContext) {
    return getUserPortfolio(ctx);
  }
}
