import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { applyToPosting } from "./apply-to-posting";

@Resolver()
export class ApplicationMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  applyToPosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
    @Arg("comment", { nullable: true }) comment: string | null,
  ) {
    return applyToPosting(ctx, postingID, comment);
  }
}
