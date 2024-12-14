import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { PostingGQL } from "../../type";
import { getUserPostings } from "./get-user-postings";
import { getAllPostings } from "./get-all-postings";
import { getPosting } from "./get-posting";

@Resolver()
export class PostingQueryResolvers {
  @Authorized()
  @Query(() => [PostingGQL])
  getUserPostings(@Ctx() ctx: AuthorizedContext): Promise<PostingGQL[]> {
    return getUserPostings(ctx);
  }
  @Query(() => [PostingGQL])
  getAllPostings(): Promise<PostingGQL[]> {
    return getAllPostings();
  }
  @Query(() => PostingGQL, { nullable: true })
  getPosting(
    @Arg("id", () => Int) id: number,
  ): Promise<PostingGQL | null | undefined> {
    return getPosting(id);
  }
}
