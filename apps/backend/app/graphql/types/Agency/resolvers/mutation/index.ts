import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import {
  addAgencyBasicDetails,
  AgencyBasicDetailsInput,
} from "./add-agency-basic-details";
import { updateAgency, UpdateAgencyInput } from "./update-agency";
import { addAgencyInstagramUsername } from "./add-agency-instagram-username";
import { addAgencyUsername, AgencyUsernameInput } from "./add-agency-username";
import { addAgencyLocation, AgencyLocationInput } from "./add-agency-location";

@Resolver()
export class AgencyMutationResolvers {
  @Authorized()
  @Mutation(() => Boolean)
  async addAgencyBasicDetails(
    @Ctx() ctx: AuthorizedContext,
    @Arg("agency") agency: AgencyBasicDetailsInput,
  ) {
    return addAgencyBasicDetails(ctx, agency);
  }
  @Authorized()
  @Mutation(() => Boolean)
  async addAgencyInstagramUsername(
    @Ctx() ctx: AuthorizedContext,
    @Arg("username") username: string,
  ) {
    return addAgencyInstagramUsername(ctx, username);
  }
  @Authorized()
  @Mutation(() => Boolean)
  async addAgencyUsername(
    @Ctx() ctx: AuthorizedContext,
    @Arg("data") data: AgencyUsernameInput,
  ) {
    return addAgencyUsername(ctx, data);
  }
  @Authorized()
  @Mutation(() => String)
  async addAgencyLocation(
    @Ctx() ctx: AuthorizedContext,
    @Arg("data") data: AgencyLocationInput,
  ) {
    return addAgencyLocation(ctx, data);
  }
  @Authorized()
  @Mutation(() => Boolean)
  async updateAgency(
    @Ctx() ctx: AuthorizedContext,
    @Arg("id") id: number,
    @Arg("data") data: UpdateAgencyInput,
  ) {
    return updateAgency(ctx, id, data);
  }
}
