import type { AuthorizedContext, Context } from "@backend/lib/auth/context";
import { handleGetSubscribeLink } from "@graphql/User/resolvers/get-subscribe-link";
import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";

import { handleGetCurrentUser } from "./resolvers/get-current-user";
import {
  GetFeaturedPostsResponse,
  handleGetFeaturedPosts,
} from "./resolvers/get-featured-posts";
import { handleGetFeaturedSellers } from "./resolvers/get-featured-sellers";
import { handleGetSeller } from "./resolvers/get-seller";
import { handleIsUsernameAvailable } from "./resolvers/is-username-available";
import {
  handleSearchSellers,
  SearchSellersFiltersInput,
} from "./resolvers/search-sellers";
import { Subscription, UserGQL } from "./type";

@Resolver()
export class UserQueryResolver {
  @Authorized()
  @Query(() => Subscription, { nullable: true })
  async getSubscription(@Ctx() ctx: AuthorizedContext) {
    return handleGetSubscribeLink(ctx);
  }
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
  async searchSellers(
    @Arg("filters") filters: SearchSellersFiltersInput,
    @Ctx() ctx: Context,
  ) {
    return handleSearchSellers(ctx, filters);
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
