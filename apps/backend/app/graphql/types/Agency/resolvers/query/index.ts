import {Arg, Ctx, Query, Resolver} from "type-graphql";
import {AgencyGQL} from "../../type";
import type {AuthorizedContext} from "../../../../context";
import {getFeaturedAgencies} from "./get-featured-agencies";
import {getCurrentUserAgency} from "./get-current-user-agency";

@Resolver()
export class AgencyQueryResolvers {
  @Query(() => [AgencyGQL])
  async getFeaturedAgencies() {
    return getFeaturedAgencies();
  }
  @Query(() => AgencyGQL, { nullable: true })
  async getCurrentUserAgency(
    @Ctx() ctx: AuthorizedContext,
    @Arg("username", { nullable: true }) username?: string,
  ) {
    return getCurrentUserAgency(ctx, username);
  }
}
