import type { AuthorizedContext } from "@backend/lib/auth/context";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { deleteUser } from "./resolvers/delete-user";
import { handleDisconnectInstagram } from "./resolvers/disconnect-instagram";
import { handleUnlinkSocialAccount } from "./resolvers/unlink-social-account";
import {
  handleUpdateInstagramUsername,
  UpdateInstagramUsernameResponse,
} from "./resolvers/update-instagram-username";
import { handleUpdateUser, UpdateUserInput } from "./resolvers/update-user";
import {
  handleUpdateLocation,
  UpdateLocationInput,
} from "./resolvers/update-user-location";

@Resolver()
export class UserMutationResolver {
  @Authorized()
  @Mutation(() => UpdateInstagramUsernameResponse)
  updateInstagramUsername(
    @Arg("username") username: string,
    @Ctx() ctx: AuthorizedContext,
  ): Promise<UpdateInstagramUsernameResponse> {
    return handleUpdateInstagramUsername(ctx, username);
  }
  @Authorized()
  @Mutation(() => Boolean)
  unlinkSocialAccount(@Ctx() ctx: AuthorizedContext) {
    return handleUnlinkSocialAccount(ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateUser(
    @Ctx() ctx: AuthorizedContext,
    @Arg("updatedUser") updatedUser: UpdateUserInput,
  ): Promise<boolean> {
    return handleUpdateUser(ctx, updatedUser);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateUserLocation(
    @Ctx() ctx: AuthorizedContext,
    @Arg("updatedLocation") updatedLocation: UpdateLocationInput,
  ): Promise<boolean> {
    return handleUpdateLocation(ctx, updatedLocation);
  }
  @Authorized()
  @Mutation(() => Boolean)
  disconnectInstagram(@Ctx() ctx: AuthorizedContext) {
    return handleDisconnectInstagram(ctx);
  }
  @Authorized()
  @Mutation(() => Boolean)
  deleteUser(@Ctx() ctx: AuthorizedContext): Promise<boolean> {
    return deleteUser(ctx);
  }
}
