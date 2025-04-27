import type { Context } from "@backend/lib/auth/context";
import { Arg, Ctx, Int, Query, Resolver } from "type-graphql";

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
    @Arg("posting", { nullable: true }) postingID?: number,
  ): Promise<PostingGQL[]> {
    return getAllPostings(ctx, page, postingID);
  }
  @Query(() => [PostingGQL])
  getFeaturedPostings(): Promise<PostingGQL[]> {
    return getFeaturedPostings();
  }
  @Query(() => PostingGQL, { nullable: true })
  getPosting(
    @Arg("id", () => Int) id: number,
  ): Promise<PostingGQL | null | undefined> {
    return getPosting(id);
  }
}
