import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { UserGQL } from "../../type";
import { handleGetCurrentUser } from "./get-current-user";
import { handleGetFeaturedSellers } from "./get-featured-sellers";

@Resolver()
export class UserQueryResolver {
  @Query(() => UserGQL)
  @Authorized()
  async getCurrentUser(@Ctx() ctx: Context) {
    return handleGetCurrentUser(ctx);
  }
  @Query(() => [UserGQL])
  async getFeaturedSellers() {
    return handleGetFeaturedSellers();
  }
}
