import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { Currency } from "../../type";
import { handleUpdateUser, UpdateUserInput } from "./update-user";
import { handleDisconnectInstagram } from "./disconnect-instagram";
import {
  handleUpdateLocation,
  UpdateLocationInput,
} from "./update-user-location";
import { handleUpdateInstagramUsername } from "./update-instagram-username";

@Resolver()
export class UserMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  updateInstagramUsername(
    @Arg("username") username: string,
    @Ctx() ctx: AuthorizedContext,
  ): Promise<boolean> {
    return handleUpdateInstagramUsername(ctx, username);
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
  @Mutation(() => Currency)
  updateUserLocation(
    @Ctx() ctx: AuthorizedContext,
    @Arg("updatedLocation") updatedLocation: UpdateLocationInput,
  ): Promise<Currency> {
    return handleUpdateLocation(ctx, updatedLocation);
  }
  @Authorized()
  @Mutation(() => Boolean)
  disconnectInstagram(@Ctx() ctx: AuthorizedContext) {
    return handleDisconnectInstagram(ctx);
  }
}
