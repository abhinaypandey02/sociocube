import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { OrganizationGQL } from "../../types";
import { type Context } from "../../../../context";
import { handleGetOrganization } from "./get-organization";

@Resolver()
export class OrganizationQueryResolver {
  @Query(() => OrganizationGQL, { nullable: true })
  @Authorized()
  async getOrganization(@Ctx() ctx: Context) {
    return handleGetOrganization(ctx);
  }
}
