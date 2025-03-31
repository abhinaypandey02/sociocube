import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "@graphql/context";
import { UserGQL } from "../../type";
import { handleGetCurrentUser } from "./get-current-user";
import { handleGetFeaturedSellers } from "./get-featured-sellers";
import { handleGetSeller } from "./get-seller";
import {
  handleSearchSellers,
  SearchSellersFiltersInput,
} from "./search-sellers";
import { handleIsUsernameAvailable } from "./is-username-available";
import {
  GetFeaturedPostsResponse,
  handleGetFeaturedPosts,
} from "./get-featured-posts";

@Resolver()
export class UserQueryResolver {
  @Query(() => UserGQL, { nullable: true })
  async getCurrentUser(@Ctx() ctx: AuthorizedContext) {
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
  async getSeller(@Arg("username") username: string) {
    return handleGetSeller(username);
  }
  @Query(() => [UserGQL], { nullable: true })
  async searchSellers(@Arg("filters") filters: SearchSellersFiltersInput) {
    return handleSearchSellers(filters);
  }
  @Authorized()
  @Query(() => Boolean)
  async isUsernameAvailable(
    @Ctx() ctx: AuthorizedContext,
    @Arg("username") username: string,
  ) {
    return handleIsUsernameAvailable(ctx, username);
  }
}
