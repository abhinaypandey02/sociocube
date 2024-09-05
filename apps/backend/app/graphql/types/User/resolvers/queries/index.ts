import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { UserGQL } from "../../type";
import { handleGetCurrentUser } from "./get-current-user";

@Resolver()
export class UserQueryResolver {
  @Query(() => UserGQL)
  @Authorized()
  async getCurrentUser(@Ctx() ctx: Context) {
    return handleGetCurrentUser(ctx);
  }
}
