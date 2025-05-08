import type { Context } from "@backend/lib/auth/context";
import { getPostingSelected } from "@graphql/Application/resolvers/get-posting-selected";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

import { getHasUserApplied } from "./resolvers/get-has-user-applied";
import { getPostingApplications } from "./resolvers/get-posting-applications";
import { getUserApplications } from "./resolvers/get-user-applications";
import { ApplicationGQL } from "./type";

@Resolver()
export class ApplicationQueryResolver {
  @Query(() => [ApplicationGQL])
  getUserApplications(@Ctx() ctx: Context) {
    return getUserApplications(ctx);
  }

  @Query(() => Boolean)
  getHasUserApplied(@Ctx() ctx: Context, @Arg("postingID") postingID: number) {
    return getHasUserApplied(ctx, postingID);
  }

  @Query(() => [ApplicationGQL])
  getPostingApplications(
    @Ctx() ctx: Context,
    @Arg("postingID", () => Int) postingID: number,
  ) {
    return getPostingApplications(ctx, postingID);
  }

  @Query(() => [ApplicationGQL])
  getPostingSelected(
    @Ctx() ctx: Context,
    @Arg("postingID", () => Int) postingID: number,
  ) {
    return getPostingSelected(ctx, postingID);
  }
}
