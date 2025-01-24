import { Args, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { applyToPosting, ApplyToPostingArgs } from "./apply-to-posting";

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
}
