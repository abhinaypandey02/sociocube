import {
  getConversationChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendEvent } from "@backend/lib/socket/send-event";
import { waitUntil } from "@vercel/functions";
import { arrayContains } from "drizzle-orm";
import { getIsMessageProfanity } from "@/lib/server-actions";

import { ConversationMessageTable, ConversationTable } from "../db";


export interface MessageProfanityCheck {
  isProfane: boolean;
}

export async function handleSendMessage(
  ctx: AuthorizedContext,
  body: string,
  userID: number,
): Promise<boolean> {
  if (ctx.userId === userID) throw GQLError(400, "You cannot message yourself");

  try {
    const result = await getIsMessageProfanity(body);
    if (result?.isProfane) {
      return false;
    }
  }
  catch (error) {
    console.error("Error checking profanity:", error);
    return false;
  }

  const [conversation] = await db
    .update(ConversationTable)
    .set({
      hasRead: false,
    })
    .where(arrayContains(ConversationTable.users, [ctx.userId, userID]))
    .returning({ id: ConversationTable.id });
  let conversationID = conversation?.id;
  if (!conversationID) {
    const [newConversation] = await db
      .insert(ConversationTable)
      .values({
        users: [userID, ctx.userId],
      })
      .returning();
    conversationID = newConversation?.id;
  }
  if (conversationID) {
    const message = {
      conversation: conversationID,
      body,
      by: ctx.userId,
    };
    waitUntil(
      sendEvent(
        getConversationChannelName(conversationID),
        NEW_MESSAGE,
        message,
      ),
    );
    await db.insert(ConversationMessageTable).values(message);
    return true;
  }
  return false;
}
