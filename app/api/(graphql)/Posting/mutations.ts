import type { AuthorizedContext } from "@backend/lib/auth/context";
import { BRAND_ROLES, Roles } from "@backend/lib/constants/roles";
import { acceptPosting } from "@graphql/Posting/resolvers/accept-posting";
import { rejectPosting } from "@graphql/Posting/resolvers/reject-posting";
import { handleSendAnnouncement } from "@graphql/Posting/resolvers/send-announcement";
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";

import { acceptInvitation } from "./resolvers/accept-invitation";
import { createPosting, NewPostingInput } from "./resolvers/create-posting";
import { deleteInvitation } from "./resolvers/delete-invitation";
import { deletePosting } from "./resolvers/delete-posting";
import {
  inviteToPosting,
  InviteToPostingInput,
} from "./resolvers/invite-to-posting";
import { pausePosting } from "./resolvers/pause-posting";
import { resumePosting } from "./resolvers/resume-posting";
import { updatePosting, UpdatePostingInput } from "./resolvers/update-posting";

@Resolver()
export class PostingMutationResolvers {
  @Authorized(BRAND_ROLES)
  @Mutation(() => Number, { nullable: true })
  async createPosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("newPosting") newPosting: NewPostingInput,
  ): Promise<number | null> {
    return createPosting(ctx, newPosting);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  async updatePosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("id") id: number,
    @Arg("updatedPosting") updatedPosting: UpdatePostingInput,
  ): Promise<boolean> {
    return updatePosting(ctx, id, updatedPosting);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  async pausePosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
  ): Promise<boolean> {
    return pausePosting(ctx, postingID);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  async deletePosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
  ): Promise<boolean> {
    return deletePosting(ctx, postingID);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  async resumePosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
  ): Promise<boolean> {
    return resumePosting(ctx, postingID);
  }
  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  async sendAnnouncement(
    @Ctx() ctx: AuthorizedContext,
    @Arg("postingID") postingID: number,
    @Arg("body") body: string,
    @Arg("apps", () => [Number], { nullable: true }) apps: number[] | null,
  ): Promise<boolean> {
    return handleSendAnnouncement(ctx, postingID, body, apps);
  }
  @Authorized([Roles.Admin])
  @Mutation(() => Boolean)
  async rejectPosting(
    @Arg("postingID") postingID: number,
    @Arg("reason") reason: string,
  ): Promise<boolean> {
    return rejectPosting(postingID, reason);
  }
  @Authorized([Roles.Admin])
  @Mutation(() => Boolean)
  async acceptPosting(@Arg("postingID") postingID: number): Promise<boolean> {
    return acceptPosting(postingID);
  }

  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  async inviteToPosting(
    @Ctx() ctx: AuthorizedContext,
    @Arg("input") input: InviteToPostingInput,
  ): Promise<boolean> {
    return inviteToPosting(ctx, input);
  }

  @Authorized(BRAND_ROLES)
  @Mutation(() => Boolean)
  async deleteInvitation(
    @Ctx() ctx: AuthorizedContext,
    @Arg("accessId") accessId: number,
  ): Promise<boolean> {
    return deleteInvitation(ctx, accessId);
  }

  @Authorized()
  @Mutation(() => Boolean)
  async acceptInvitation(
    @Ctx() ctx: AuthorizedContext,
    @Arg("token") token: string,
  ): Promise<boolean> {
    return acceptInvitation(ctx, token);
  }
}
