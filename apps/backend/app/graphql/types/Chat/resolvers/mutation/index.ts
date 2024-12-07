import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { handleSendMessage } from "./send-message";
import { handleReadMessage } from "./read-message";

@Resolver()
export class ChatMutationResolvers {
  @Authorized()
  @Mutation(() => Boolean)
  sendMessage(
    @Ctx() ctx: AuthorizedContext,
    @Arg("conversationID", () => Int) conversationID: number,
    @Arg("body") body: string,
  ) {
    return handleSendMessage(ctx, conversationID, body);
  }
  @Authorized()
  @Mutation(() => Boolean)
  readMessage(
    @Ctx() ctx: AuthorizedContext,
    @Arg("conversationID", () => Int) conversationID: number,
  ) {
    return handleReadMessage(ctx, conversationID);
  }
}
