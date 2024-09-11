import { Args, Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { UserGQL } from "../../type";
import { handleGetCurrentUser } from "./get-current-user";
import { handleGetFeaturedSellers } from "./get-featured-sellers";
import { GetSellerInput, handleGetSeller } from "./get-seller";

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
  @Query(() => UserGQL, { nullable: true })
  async getSeller(@Args() args: GetSellerInput) {
    return handleGetSeller(args);
  }
}
