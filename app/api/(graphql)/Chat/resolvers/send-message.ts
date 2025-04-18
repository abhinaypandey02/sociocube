import {
  getConversationChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendEvent } from "@backend/lib/socket/send-event";
import { and, eq } from "drizzle-orm";

import { ConversationMessageTable, ConversationTable } from "../db";

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
