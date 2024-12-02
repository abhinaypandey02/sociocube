import { Arg, Args, Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { UserGQL } from "../../type";
import { handleGetCurrentUser } from "./get-current-user";
import { handleGetFeaturedSellers } from "./get-featured-sellers";
import { GetSellerInput, handleGetSeller } from "./get-seller";
import { handleSearchSellers, SearchSellersInput } from "./search-sellers";
import {
  handleIsUsernameAvailable,
  IsUsernameAvailableArgs,
} from "./is-username-available";
import {
  GetFeaturedPostsResponse,
  handleGetFeaturedPosts,
} from "./get-featured-posts";

@Resolver()
export class UserQueryResolver {
  @Query(() => UserGQL, { nullable: true })
  async getCurrentUser(@Ctx() ctx: Context) {
    return handleGetCurrentUser(ctx);
  }
  @Query(() => [UserGQL])
  async getFeaturedSellers() {
    return handleGetFeaturedSellers();
  }
  @Query(() => [GetFeaturedPostsResponse])
  async getFeaturedPosts() {
    return handleGetFeaturedPosts();
  }
  @Query(() => UserGQL, { nullable: true })
  async getSeller(@Args() args: GetSellerInput) {
    return handleGetSeller(args);
  }
  @Query(() => [UserGQL], { nullable: true })
  async searchSellers(@Arg("data") args: SearchSellersInput) {
    return handleSearchSellers(args);
  }
  @Authorized()
  @Query(() => Boolean)
  async isUsernameAvailable(@Args() args: IsUsernameAvailableArgs) {
    return handleIsUsernameAvailable(args);
  }
}
