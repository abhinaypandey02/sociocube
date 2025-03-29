import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { ConversationGQL } from "../../type";
import { handleGetChats } from "./get-chats";
import { handleGetChat } from "./get-chat";
import { handleGetChatWithUser } from "./get-chat-with-user";
import { handleGetChatWithAgency } from "./get-chat-with-agency";

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
