import type { AuthorizedContext } from "@backend/lib/auth/context";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { addPortfolio, AddPortfolioArgs } from "./resolvers/add-portfolio";
import {
  addPortfolioLink,
  AddPortfolioLinkArgs,
} from "./resolvers/add-portfolio-link";
import { deletePortfolio } from "./resolvers/delete-portfolio";
import {
  updatePortfolio,
  UpdatePortfolioArgs,
} from "./resolvers/update-portfolio";
@Resolver()
export class PortfolioMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  updatePortfolio(
    @Ctx() ctx: AuthorizedContext,
    @Arg("data") args: UpdatePortfolioArgs,
  ) {
    return updatePortfolio(ctx, args);
  }
  @Authorized()
  @Mutation(() => Number)
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
