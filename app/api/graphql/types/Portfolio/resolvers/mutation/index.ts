import type { AuthorizedContext } from "@graphql/context";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { addPortfolio, AddPortfolioArgs } from "./add-portfolio";
import { addPortfolioLink, AddPortfolioLinkArgs } from "./add-portfolio-link";
import { deletePortfolio } from "./delete-portfolio";

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
