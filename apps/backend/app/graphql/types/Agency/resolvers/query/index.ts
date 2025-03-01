import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { AgencyGQL } from "../../type";
import type { AuthorizedContext } from "../../../../context";
import { getFeaturedAgencies } from "./get-featured-agencies";
import { getCurrentUserAgency } from "./get-current-user-agency";
import { GetAgencyMember, getAgencyMembers } from "./get-agency-members";

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
  @Query(() => [GetAgencyMember], { nullable: true })
  async getAgencyMembers(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return getAgencyMembers(ctx, id);
  }
}
