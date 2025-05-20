import {
  getConversationChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendEvent } from "@backend/lib/socket/send-event";
import { waitUntil } from "@vercel/functions";
import { arrayContains, eq, desc } from "drizzle-orm";
import { getIsMessageProfanity } from "@/lib/server-actions";
import { ConversationMessageTable, ConversationTable } from "../db";
import { handleSendEmail } from "./send-email";

export interface MessageProfanityCheck {
  isProfane: boolean;
}

async function shouldSendEmail(conversationID: number): Promise<boolean> {
  const recentMessages = await db
    .select()
    .from(ConversationMessageTable)
    .where(eq(ConversationMessageTable.conversation, conversationID))
    .orderBy(desc(ConversationMessageTable.createdAt))
    .limit(2);

  if (recentMessages.length <= 1) {
    return true;
  } else if (recentMessages.length === 2) {
    const currentMessage = recentMessages[0];
    const previousMessage = recentMessages[1];
    if (currentMessage && previousMessage) {
      const timeDifference =
        currentMessage.createdAt.getTime() -
        previousMessage.createdAt.getTime();
      const oneHourInMs = 60 * 60 * 1000;

      return timeDifference > oneHourInMs;
    }
  }
  return false;
}

export async function handleSendMessage(
  ctx: AuthorizedContext,
  body: string,
  userID: number
): Promise<boolean> {
  if (ctx.userId === userID) throw GQLError(400, "You cannot message yourself");

  try {
    const result = await getIsMessageProfanity(body);
    if (result?.isProfane) {
      return false;
    }
  } catch (error) { // allowing message to send if the profanity check fails
    console.error("Error checking profanity:", error);
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
        message
      )
    );
    await db.insert(ConversationMessageTable).values(message);

    const shouldNotify = await shouldSendEmail(conversationID);
    if (shouldNotify) {
      waitUntil(handleSendEmail(userID, ctx.userId, body));
    }

    return true;
  }
  return false;
}