import type { Context } from "@backend/lib/auth/context";
import { Arg, Ctx, Query, Resolver } from "type-graphql";

import { handleGetChat } from "./resolvers/get-chat";
import { handleGetChats } from "./resolvers/get-chats";
import { ConversationGQL } from "./type";

@Resolver()
export class ChatQueryResolvers {
  @Query(() => [ConversationGQL])
  async getChats(@Ctx() ctx: Context) {
    return handleGetChats(ctx);
  }
  @Query(() => ConversationGQL, { nullable: true })
  getChat(@Ctx() ctx: Context, @Arg("username") username: string) {
    return handleGetChat(ctx, username);
  }
}
