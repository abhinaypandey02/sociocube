import { Field, InputType, Int } from "type-graphql";
import { and, eq, ne } from "drizzle-orm";
import { getConversationChannelName, NEW_MESSAGE } from "config/events";
import { Context } from "../../../../context";
import { db } from "../../../../../../lib/db";
import {
  ConversationMessageTable,
  ConversationParticipantTable,
  ConversationTable,
} from "../../db/schema";
import { sendEvent } from "../../../../../../lib/socket/send-event";

@InputType("SendMessage")
export class SendMessageInput {
  @Field(() => Int)
  conversation: number;
  @Field()
  body: string;
}

export async function handleSendMessage(
  ctx: Context,
  args: SendMessageInput,
): Promise<boolean> {
  if (ctx.userId) {
    const [conversation] = await db
      .update(ConversationTable)
      .set({
        preview: args.body.slice(0, 50),
      })
      .where(eq(ConversationTable.id, args.conversation))
      .returning({ id: ConversationTable.id });
    if (conversation?.id) {
      await db
        .update(ConversationParticipantTable)
        .set({ hasRead: true })
        .where(
          and(
            eq(ConversationParticipantTable.conversation, conversation.id),
            eq(ConversationParticipantTable.user, ctx.userId),
          ),
        );
      await db
        .update(ConversationParticipantTable)
        .set({ hasRead: false })
        .where(
          and(
            eq(ConversationParticipantTable.conversation, conversation.id),
            ne(ConversationParticipantTable.user, ctx.userId),
          ),
        );
      const message = {
        conversation: conversation.id,
        body: args.body,
        sender: ctx.userId,
        sentAt: new Date(),
      };
      await db.insert(ConversationMessageTable).values(message);
      void sendEvent(
        getConversationChannelName(conversation.id),
        NEW_MESSAGE,
        message,
      );
      return true;
    }
  }
  return false;
}
