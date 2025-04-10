import type { AuthorizedContext } from "@backend/lib/auth/context";
import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";

import { handleGetChat } from "./resolvers/get-chat";
import { handleGetChatWithAgency } from "./resolvers/get-chat-with-agency";
import { handleGetChatWithUser } from "./resolvers/get-chat-with-user";
import { handleGetChats } from "./resolvers/get-chats";
import { ConversationGQL } from "./type";

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
