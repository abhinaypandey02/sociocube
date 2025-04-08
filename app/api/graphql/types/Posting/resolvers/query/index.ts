import type { AuthorizedContext } from "@graphql/context";
import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";

import { PostingGQL } from "../../type";
import { getAllPostings } from "./get-all-postings";
import { getFeaturedPostings } from "./get-featured-postings";
import { getPosting } from "./get-posting";
import { getUserPostings } from "./get-user-postings";

@Resolver()
export class PostingQueryResolvers {
  @Authorized()
  @Query(() => [PostingGQL])
  getUserPostings(@Ctx() ctx: AuthorizedContext): Promise<PostingGQL[]> {
    return getUserPostings(ctx);
  }
  @Query(() => [PostingGQL])
  getAllPostings(@Arg("page") page: number): Promise<PostingGQL[]> {
    return getAllPostings(page);
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
