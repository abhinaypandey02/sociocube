import { Arg, Authorized, Ctx, Int, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { ChatGQL } from "../../type";
import { handleGetChats } from "./get-chats";
import { handleGetChat } from "./get-chat";

@Resolver()
export class ChatQueryResolvers {
  @Query(() => [ChatGQL])
  @Authorized()
  async getChats(@Ctx() ctx: AuthorizedContext) {
    return handleGetChats(ctx);
  }
  @Authorized()
  @Query(() => ChatGQL, { nullable: true })
  getChat(
    @Ctx() ctx: AuthorizedContext,
    @Arg("userID", () => Int) userID: number,
  ) {
    return handleGetChat(ctx, userID);
  }
}
