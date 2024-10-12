import { and, eq } from "drizzle-orm";
import { Context } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationParticipantTable } from "../../db/schema";

export async function handleReadMessage(
  ctx: Context,
  conversation: number,
): Promise<boolean> {
  if (ctx.userId) {
    await db
      .update(ConversationParticipantTable)
      .set({
        hasRead: true,
      })
      .where(
        and(
          eq(ConversationParticipantTable.conversation, conversation),
          eq(ConversationParticipantTable.user, ctx.userId),
        ),
      );
    return true;
  }
  return false;
}
