import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { addPortfolio, AddPortfolioArgs } from "./add-portfolio";
import { deletePortfolio } from "./delete-portfolio";
import { addPortfolioLink, AddPortfolioLinkArgs } from "./add-portfolio-link";

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
  @Authorized()
  @Mutation(() => Boolean)
  addPortfolioLink(
    @Ctx() ctx: AuthorizedContext,
    @Arg("data") args: AddPortfolioLinkArgs,
  ) {
    return addPortfolioLink(ctx, args);
  }
  @Authorized()
  @Mutation(() => Boolean)
  deletePortfolio(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return deletePortfolio(ctx, id);
  }
}
