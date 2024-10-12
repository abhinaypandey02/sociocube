import { Arg, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import type { Context } from "../../../../context";
import { handleSendMessage, SendMessageInput } from "./send-message";
import { handleReadMessage } from "./read-message";

@Resolver()
export class ChatMutationResolver {
  @Authorized()
  @Mutation(() => Boolean)
  sendMessage(@Ctx() ctx: Context, @Arg("data") args: SendMessageInput) {
    return handleSendMessage(ctx, args);
  }
  @Authorized()
  @Mutation(() => Boolean)
  readMessage(
    @Ctx() ctx: Context,
    @Arg("conversation", () => Int) conversation: number,
  ) {
    return handleReadMessage(ctx, conversation);
  }
}
