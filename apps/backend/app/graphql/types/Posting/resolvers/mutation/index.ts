import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { createPosting, NewPostingInput } from "./create-posting";
import { pausePosting } from "./pause-posting";
import { deletePosting } from "./delete-posting";
import { resumePosting } from "./resume-posting";

@Resolver()
export class PostingMutationResolvers {
  @Authorized()
  @Mutation(() => Number, { nullable: true })
  async createPosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("newPosting") newPosting: NewPostingInput,
  ): Promise<number | null> {
    return createPosting(ctx, newPosting);
  }
  @Authorized()
  @Mutation(() => Boolean)
  async pausePosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
  ): Promise<boolean> {
    return pausePosting(ctx, postingID);
  }
  @Authorized()
  @Mutation(() => Boolean)
  async deletePosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
  ): Promise<boolean> {
    return deletePosting(ctx, postingID);
  }
  @Authorized()
  @Mutation(() => Boolean)
  async resumePosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
  ): Promise<boolean> {
    return resumePosting(ctx, postingID);
  }
}
