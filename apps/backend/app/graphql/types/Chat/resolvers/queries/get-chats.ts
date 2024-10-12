import { aliasedTable, and, eq, ne } from "drizzle-orm";
import { Context } from "../../../../context";
import { db } from "../../../../../../lib/db";
import {
  ConversationParticipantTable,
  ConversationTable,
} from "../../db/schema";
import { ChatGQL } from "../../type";

export async function handleGetChats(ctx: Context): Promise<ChatGQL[]> {
  if (ctx.userId) {
    const OtherParticipantsTable = aliasedTable(
      ConversationParticipantTable,
      "other_participants",
    );
    const participantConversations = await db
      .select({
        with: OtherParticipantsTable.user,
        hasRead: ConversationParticipantTable.hasRead,
        preview: ConversationTable.preview,
        id: ConversationTable.id,
      })
      .from(ConversationParticipantTable)
      .innerJoin(
        OtherParticipantsTable,
        eq(
          OtherParticipantsTable.conversation,
          ConversationParticipantTable.conversation,
        ),
      )
      .innerJoin(
        ConversationTable,
        eq(ConversationTable.id, ConversationParticipantTable.conversation),
      )
      .where(
        and(
          eq(ConversationParticipantTable.user, ctx.userId),
          ne(ConversationParticipantTable.id, OtherParticipantsTable.id),
        ),
      );
    return participantConversations.map((conversation) => ({
      conversation: conversation.id,
      with: conversation.with || -1,
      hasRead: Boolean(conversation.hasRead),
      preview: conversation.preview || "",
    }));
  }
  return [];
}
