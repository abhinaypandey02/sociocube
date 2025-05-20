import type { Context } from "@backend/lib/auth/context";
import { Roles } from "@backend/lib/constants/roles";
import { handleGetPostingsInReview } from "@graphql/Posting/resolvers/get-postings-in-review";
import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";

import { getAllPostings } from "./resolvers/get-all-postings";
import { getFeaturedPostings } from "./resolvers/get-featured-postings";
import { getPosting } from "./resolvers/get-posting";
import { getUserPostings } from "./resolvers/get-user-postings";
import { PostingGQL } from "./type";

@Resolver()
export class PostingQueryResolvers {
  @Query(() => [PostingGQL])
  getUserPostings(
    @Ctx() ctx: Context,
    @Arg("page", { nullable: true }) page: number,
  ): Promise<PostingGQL[]> {
    return getUserPostings(ctx, page ?? 1);
  }
  @Query(() => [PostingGQL])
  getAllPostings(
    @Ctx() ctx: Context,
    @Arg("page") page: number,
  ): Promise<PostingGQL[]> {
    return getAllPostings(ctx, page);
  }
  @Query(() => [PostingGQL])
  getFeaturedPostings(): Promise<PostingGQL[]> {
    return getFeaturedPostings();
  }
  @Query(() => PostingGQL, { nullable: true })
  getPosting(
    @Arg("id", () => Int) id: number,
    @Arg("owned", { nullable: true }) owned: boolean,
    @Ctx() ctx: Context,
  ): Promise<PostingGQL | null | undefined> {
    return getPosting(ctx, id, owned);
  }

  @Authorized([Roles.Admin])
  @Query(() => [PostingGQL])
  getPostingsInReview() {
    return handleGetPostingsInReview();
  }
}
