import { db } from "@backend/lib/db";
import { sendEvent } from "@backend/lib/socket/send-event";
import { getConversationChannelName, NEW_MESSAGE } from "@backend/pusher/utils";
import type { AuthorizedContext } from "@graphql/context";
import { and, eq } from "drizzle-orm";

import GQLError from "../../../../constants/errors";
import { ConversationMessageTable, ConversationTable } from "../../db/schema";

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
  void sendEvent(
    getConversationChannelName(conversationID),
    NEW_MESSAGE,
    message,
  );
  return true;
}
