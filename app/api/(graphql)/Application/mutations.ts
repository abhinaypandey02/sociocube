import type { AuthorizedContext } from "@backend/lib/auth/context";
import { shortlistUser } from "@graphql/Application/resolvers/shortlist-recommendation";
import { updateShortlist } from "@graphql/Application/resolvers/update-shortlist";
import { Arg, Args, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import {
  applyToPosting,
  ApplyToPostingArgs,
} from "./resolvers/apply-to-posting";
import { likeApplication } from "./resolvers/like-application";
import { rejectApplication } from "./resolvers/reject-application";

@Resolver()
export class ApplicationMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  applyToPosting(
    @Ctx() ctx: AuthorizedContext,
    @Args() { postingID, comment }: ApplyToPostingArgs,
  ) {
    return applyToPosting(ctx, postingID, comment);
  }
  @Authorized()
  @Mutation(() => Boolean)
  likeApplication(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return likeApplication(ctx, id);
  }
  @Authorized()
  @Mutation(() => Boolean)
  updateShortlist(
    @Ctx() ctx: AuthorizedContext,
    @Arg("id") id: number,
    @Arg("accepted") accepted: boolean,
  ) {
    return updateShortlist(ctx, id, accepted);
  }
  @Authorized()
  @Mutation(() => Boolean)
  rejectApplication(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return rejectApplication(ctx, id);
  }
  @Authorized()
  @Mutation(() => Boolean)
  shortlistUser(
    @Ctx() ctx: AuthorizedContext,
    @Arg("userID") userID: number,
    @Arg("postingID") postingID: number,
  ) {
    return shortlistUser(ctx, userID, postingID);
  }
}
