import {
  getConversationChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendEvent } from "@backend/lib/socket/send-event";
import { waitUntil } from "@vercel/functions";
import { arrayContains, eq, desc, and, gt } from "drizzle-orm";
import { getIsMessageProfanity } from "@/lib/server-actions";
import { ConversationMessageTable, ConversationTable } from "../db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { UserTable } from "../../User/db";

export interface MessageProfanityCheck {
  isProfane: boolean;
}

async function shouldSendEmail(conversationID: number): Promise<boolean> {
  const cooldownTime = new Date();
  cooldownTime.setHours(cooldownTime.getHours() - 1);
  const [recentMessage] = await db
    .select()
    .from(ConversationMessageTable)
    .where(
      and(
        eq(ConversationMessageTable.conversation, conversationID),
        gt(ConversationMessageTable.createdAt, cooldownTime)
      )
    )
    .orderBy(desc(ConversationMessageTable.createdAt))
    .offset(1)
    .limit(1);
    console.log("should send email ? ", !recentMessage);
  return !recentMessage;
}

async function handleSendEmail(
  recipientId: number,
  senderId: number,
  messageBody: string
): Promise<void> {
  try {
    console.log("Sending email to recipientId:", recipientId);
    const [recipient] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, recipientId))
      .limit(1);

    const [sender] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, senderId))
      .limit(1);

    const messagePreview =
      messageBody.length > 100
        ? `${messageBody.substring(0, 97)} ...`
        : messageBody;

    if (recipient && sender) {
      sendTemplateEmail(recipient.email, "MessageReceived", {
        senderName: sender.name || "",
        messagePreview,
        senderUsername: sender.username || "",
      });
    }
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
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
  } catch (error) {
    // allowing message to send if the profanity check fails
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

    waitUntil(
      (async () => {
        const shouldNotify = await shouldSendEmail(conversationID);
        if (shouldNotify) {
          handleSendEmail(userID, ctx.userId, body);
        }
      })()
    );

    return true;
  }
  return false;
}