import { and, eq } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationMessageTable, ConversationTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";

export async function handleSendMessage(
  ctx: AuthorizedContext,
  body: string,
  conversationID: number,
): Promise<boolean> {
  const [conversation] = await db
    .update(ConversationTable)
    .set({
      hasRead: false,
    })
    .where(and(eq(ConversationTable.id, conversationID)))
    .returning({ agency: ConversationTable.agency });
  if (!conversation?.agency) throw GQLError(404, "Conversation doesnt exist");
  const message = {
    conversation: conversationID,
    body,
    byAgency: Boolean(conversation.agency === ctx.userId),
  };
  await db.insert(ConversationMessageTable).values(message);

  return true;
}
