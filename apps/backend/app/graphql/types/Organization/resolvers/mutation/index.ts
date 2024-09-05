import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { type Context } from "../../../../context";
import {
  CreateOrganizationInput,
  handleCreateOrganization,
} from "./create-organization";
import {
  handleUpdateOrganization,
  UpdateOrganizationInput,
} from "./update-organization";

@Resolver()
export class OrganizationMutationResolver {
  @Mutation(() => Int, { nullable: true })
  @Authorized()
  async createOrganization(
    @Arg("data") data: CreateOrganizationInput,
    @Ctx() ctx: Context,
  ) {
    return handleCreateOrganization(data, ctx);
  }
  @Mutation(() => Boolean)
  @Authorized()
  async updateOrganization(
    @Arg("data") data: UpdateOrganizationInput,
    @Ctx() ctx: Context,
  ) {
    return handleUpdateOrganization(data, ctx);
  }
}
