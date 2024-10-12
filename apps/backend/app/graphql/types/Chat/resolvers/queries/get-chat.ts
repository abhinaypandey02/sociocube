import { and, count, eq, inArray } from "drizzle-orm";
import { Context } from "../../../../context";
import { db } from "../../../../../../lib/db";
import {
  ConversationParticipantTable,
  ConversationTable,
} from "../../db/schema";
import { ChatGQL } from "../../type";

export async function handleGetChat(
  ctx: Context,
  user: number,
): Promise<ChatGQL | null> {
  if (ctx.userId) {
    if (user === ctx.userId) return null;
    const users = [user, ctx.userId];
    const [prevChat] = await db
      .select({
        id: ConversationTable.id,
        preview: ConversationTable.preview,
      })
      .from(ConversationParticipantTable)
      .where(inArray(ConversationParticipantTable.user, users))
      .innerJoin(
        ConversationTable,
        eq(ConversationParticipantTable.conversation, ConversationTable.id),
      )
      .groupBy(ConversationTable.id, ConversationTable.preview)
      .having(eq(count(ConversationParticipantTable.conversation), 2));
    if (prevChat?.id) {
      await db
        .update(ConversationParticipantTable)
        .set({ hasRead: true })
        .where(
          and(
            eq(ConversationParticipantTable.conversation, prevChat.id),
            eq(ConversationParticipantTable.user, ctx.userId),
          ),
        );
      return {
        conversation: prevChat.id,
        with: user,
        hasRead: true,
        preview: prevChat.preview || "",
      };
    }
    const conversation = await db.transaction(async (tx) => {
      if (!ctx.userId) return;
      const [conversationRes] = await db
        .insert(ConversationTable)
        .values({})
        .returning({
          id: ConversationTable.id,
          preview: ConversationTable.preview,
        });
      if (!conversationRes?.id) return tx.rollback();
      await db.insert(ConversationParticipantTable).values(
        users.map((u) => ({
          conversation: conversationRes.id,
          user: u,
        })),
      );
      return conversationRes;
    });
    if (conversation?.id)
      return {
        conversation: conversation.id,
        with: user,
        hasRead: true,
        preview: "",
      };
  }
  return null;
}
