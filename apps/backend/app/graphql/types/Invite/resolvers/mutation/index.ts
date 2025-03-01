import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { sendInvite, SendInviteArgs } from "./send-invite";
import { acceptInvite } from "./accept-invite";

@Resolver()
export class InviteMutationResolver {
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  sendInvite(@Ctx() ctx: AuthorizedContext, @Arg("args") data: SendInviteArgs) {
    return sendInvite(ctx, data);
  }
  @Authorized()
  @Mutation(() => Boolean)
  acceptInvite(@Ctx() ctx: AuthorizedContext, @Arg("token") token: string) {
    return acceptInvite(ctx, token);
  }
}
