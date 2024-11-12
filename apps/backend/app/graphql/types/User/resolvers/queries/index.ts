import { Arg, Args, Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { UserGQL } from "../../type";
import { FileGQL } from "../../../File/type";
import {
  getFileURL,
  getUploadFileURL,
} from "../../../../../../lib/storage/aws-s3";
import { Roles } from "../../../../constants/roles";
import { handleGetCurrentUser } from "./get-current-user";
import { handleGetFeaturedSellers } from "./get-featured-sellers";
import { GetSellerInput, handleGetSeller } from "./get-seller";
import { handleSearchSellers, SearchSellersInput } from "./search-sellers";

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
  @Query(() => UserGQL, { nullable: true })
  async getSeller(@Args() args: GetSellerInput) {
    return handleGetSeller(args);
  }
  @Query(() => [UserGQL], { nullable: true })
  async searchSellers(@Arg("data") args: SearchSellersInput) {
    return handleSearchSellers(args);
  }
  @Authorized([Roles.ADMIN])
  @Query(() => FileGQL)
  async spiritPhotoURL(@Arg("username") username: string): Promise<FileGQL> {
    return {
      uploadURL: await getUploadFileURL(["Spirit", username, "photo"], true),
      url: getFileURL(["Spirit", username, "photo"]),
    };
  }
}
