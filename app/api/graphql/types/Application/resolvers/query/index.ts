import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";
import { ApplicationGQL } from "../../type";
import type { AuthorizedContext } from "../../../../context";
import { getUserApplications } from "./get-user-applications";
import { getPostingApplications } from "./get-posting-applications";
import { getHasUserApplied } from "./get-has-user-applied";

@Resolver()
export class ApplicationQueryResolver {
  @Authorized()
  @Query(() => [ApplicationGQL])
  getUserApplications(@Ctx() ctx: AuthorizedContext) {
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
