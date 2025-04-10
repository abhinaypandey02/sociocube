import type { AuthorizedContext, Context } from "@backend/lib/auth/context";
import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";

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
  getHasUserApplied(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
  ) {
    return getHasUserApplied(ctx, postingID);
  }

  @Authorized()
  @Query(() => [ApplicationGQL])
  getPostingApplications(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID", () => Int) postingID: number,
  ) {
    return getPostingApplications(ctx, postingID);
  }
}
