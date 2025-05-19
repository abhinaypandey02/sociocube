import type { AuthorizedContext } from "@backend/lib/auth/context";
import { BRAND_ROLES, Roles } from "@backend/lib/constants/roles";
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
  @Authorized([Roles.Creator])
  @Mutation(() => Boolean)
  applyToPosting(
    @Ctx() ctx: AuthorizedContext,
    @Args() { postingID, comment }: ApplyToPostingArgs,
  ) {
    return applyToPosting(ctx, postingID, comment);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  likeApplication(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return likeApplication(ctx, id);
  }
  @Authorized([Roles.Creator])
  @Mutation(() => Boolean)
  updateShortlist(
    @Ctx() ctx: AuthorizedContext,
    @Arg("id") id: number,
    @Arg("accepted") accepted: boolean,
  ) {
    return updateShortlist(ctx, id, accepted);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  rejectApplication(@Ctx() ctx: AuthorizedContext, @Arg("id") id: number) {
    return rejectApplication(ctx, id);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  shortlistUser(
    @Ctx() ctx: AuthorizedContext,
    @Arg("userID") userID: number,
    @Arg("postingID") postingID: number,
  ) {
    return shortlistUser(ctx, userID, postingID);
  }
}
