import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { addPortfolio, AddPortfolioArgs } from "./add-portfolio";

@Resolver()
export class PortfolioMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  addPortfolio(
    @Ctx() ctx: AuthorizedContext,
    @Arg("data") args: AddPortfolioArgs,
  ) {
    return addPortfolio(ctx, args);
  }
}
