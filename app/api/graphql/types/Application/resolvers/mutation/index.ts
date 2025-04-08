import type { AuthorizedContext } from "@graphql/context";
import { Arg, Args, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { applyToPosting, ApplyToPostingArgs } from "./apply-to-posting";
import { likeApplication } from "./like-application";
import { rejectApplication } from "./reject-application";

@Resolver()
export class ApplicationMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  applyToPosting(
    @Ctx() ctx: AuthorizedContext,
    @Args() { postingID, email, comment, phone }: ApplyToPostingArgs,
  ) {
    return applyToPosting(ctx, postingID, email, comment, phone);
  }
  @Authorized()
  @Mutation(() => Boolean)
  likeApplication(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return likeApplication(ctx, id);
  }
  @Authorized()
  @Mutation(() => Boolean)
  rejectApplication(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return rejectApplication(ctx, id);
  }
}
