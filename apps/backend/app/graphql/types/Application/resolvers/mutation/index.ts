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
    @Arg("email") email: string,
    @Arg("comment", () => String, { nullable: true }) comment: string | null,
  ) {
    return applyToPosting(ctx, postingID, email, comment);
  }
}
