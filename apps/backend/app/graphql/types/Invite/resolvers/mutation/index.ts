import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { InviteType } from "../../db/schema";
import { sendInvite } from "./send-invite";
import { acceptInvite } from "./accept-invite";

@Resolver()
export class InviteMutationResolver {
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  sendInvite(
    @Ctx() ctx: AuthorizedContext,
    @Arg("email") email: string,
    @Arg("type", () => InviteType) type: InviteType,
    @Arg("agency") agency: number,
  ) {
    return sendInvite(ctx, email, type, agency);
  }
  @Authorized()
  @Mutation(() => Boolean)
  acceptInvite(@Ctx() ctx: AuthorizedContext, @Arg("token") token: string) {
    return acceptInvite(ctx, token);
  }
}
