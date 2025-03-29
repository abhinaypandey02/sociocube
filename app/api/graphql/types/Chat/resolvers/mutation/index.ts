import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import type { AuthorizedContext } from "@graphql/context";
import { handleSendMessage } from "./send-message";
import { handleReadMessage } from "./read-message";
import { handleSendMessageToUser } from "./send-message-to-user";

@Resolver()
export class ChatMutationResolvers {
  @Authorized()
  @Mutation(() => Boolean)
  sendMessage(
    @Ctx() ctx: AuthorizedContext,
    @Arg("conversationID", () => Int) conversationID: number,
    @Arg("body") body: string,
  ) {
    return handleSendMessage(ctx, body, conversationID);
  }
  @Authorized()
  @Mutation(() => Boolean)
  sendMessageToUser(
    @Ctx() ctx: AuthorizedContext,
    @Arg("userID", () => Int) userID: number,
    @Arg("body") body: string,
  ) {
    return handleSendMessageToUser(ctx, body, userID);
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
