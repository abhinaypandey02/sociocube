import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { PostingGQL } from "../../type";
import { getUserPostings } from "./get-user-postings";
import { getAllPostings } from "./get-all-postings";

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
}
