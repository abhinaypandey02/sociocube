import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { isEmail } from "class-validator";
import type { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { applyToPosting } from "./apply-to-posting";

@Resolver()
export class ApplicationMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  applyToPosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
    @Arg("email", {
      validateFn: (argValue) => {
        if (!isEmail(argValue)) throw GQLError(400, "Email is required");
      },
    })
    email: string,
    @Arg("comment", () => String, { nullable: true }) comment: string | null,
  ) {
    return applyToPosting(ctx, postingID, email, comment);
  }
}
