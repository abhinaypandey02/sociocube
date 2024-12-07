import { and, eq } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationParticipantTable } from "../../db/schema";

export async function handleReadMessage(
  ctx: AuthorizedContext,
  conversationID: number,
): Promise<boolean> {
  await db
    .update(ConversationParticipantTable)
    .set({
      hasRead: true,
    })
    .where(
      and(
        eq(ConversationParticipantTable.conversation, conversationID),
        eq(ConversationParticipantTable.user, ctx.userId),
      ),
    );
  return true;
}
