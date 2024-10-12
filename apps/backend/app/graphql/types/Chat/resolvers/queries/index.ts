import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { ChatGQL } from "../../type";
import { handleGetChats } from "./get-chats";
import { handleGetChat } from "./get-chat";

@Resolver()
export class ChatQueryResolver {
  @Query(() => [ChatGQL])
  @Authorized()
  async getChats(@Ctx() ctx: Context) {
    return handleGetChats(ctx);
  }
  @Authorized()
  @Query(() => ChatGQL, { nullable: true })
  getChat(@Arg("user", () => Int) user: number, @Ctx() ctx: Context) {
    return handleGetChat(ctx, user);
  }
}
