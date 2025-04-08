import type { AuthorizedContext } from "@graphql/context";
import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";

import { ConversationGQL } from "../../type";
import { handleGetChat } from "./get-chat";
import { handleGetChatWithAgency } from "./get-chat-with-agency";
import { handleGetChatWithUser } from "./get-chat-with-user";
import { handleGetChats } from "./get-chats";

@Resolver()
export class ChatQueryResolvers {
  @Query(() => [ConversationGQL])
  @Authorized()
  async getChats(@Ctx() ctx: AuthorizedContext) {
    return handleGetChats(ctx);
  }
  @Authorized()
  @Query(() => ConversationGQL, { nullable: true })
  getChat(
    @Ctx() ctx: AuthorizedContext,
    @Arg("conversationID", () => Int) conversationID: number,
  ) {
    return handleGetChat(ctx, conversationID);
  }
  @Authorized()
  @Query(() => ConversationGQL, { nullable: true })
  getChatWithUser(
    @Ctx() ctx: AuthorizedContext,
    @Arg("username", () => String) username: string,
  ) {
    return handleGetChatWithUser(ctx, username);
  }
  @Authorized()
  @Query(() => ConversationGQL, { nullable: true })
  getChatWithAgency(
    @Ctx() ctx: AuthorizedContext,
    @Arg("username", () => String) username: string,
  ) {
    return handleGetChatWithAgency(ctx, username);
  }
}
