import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "@graphql/context";
import { PostingGQL } from "../../type";
import { PaginationArgs } from "@graphql/utils/pagination";
import { getUserPostings } from "./get-user-postings";
import { getAllPostings, SearchPostingsFiltersInput } from "./get-all-postings";
import { getPosting } from "./get-posting";
import { getFeaturedPostings } from "./get-featured-postings";

@Resolver()
export class PostingQueryResolvers {
  @Authorized()
  @Query(() => [PostingGQL])
  getUserPostings(@Ctx() ctx: AuthorizedContext): Promise<PostingGQL[]> {
    return getUserPostings(ctx);
  }
  @Query(() => [PostingGQL])
  getAllPostings(
    @Arg("pagination") pagination: PaginationArgs,
    @Arg("filters", { nullable: true }) filters?: SearchPostingsFiltersInput,
  ): Promise<PostingGQL[]> {
    return getAllPostings(filters || {}, pagination);
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
