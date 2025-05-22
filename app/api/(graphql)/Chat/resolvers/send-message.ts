import { getUserChannelName, NEW_MESSAGE } from "@backend/(rest)/pusher/utils";
import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { sendEvent } from "@backend/lib/socket/send-event";
import { waitUntil } from "@vercel/functions";
import { and, arrayContains, desc, eq, getTableColumns, gt } from "drizzle-orm";

import { UserTable } from "../../User/db";
import { ConversationMessageTable, ConversationTable } from "../db";

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
  return !recentMessage;
}

async function handleSendEmail(
  recipientId: number,
  sender: {name: string | null; username: string | null},
  messageBody: string
): Promise<void> {
  const [recipient] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, recipientId));

  if (recipient?.emailVerified && sender) {
    sendTemplateEmail(recipient.email, "MessageReceived", {
      senderName: sender.name || "",
      messagePreview: messageBody,
      senderUsername: sender.username || "",
    });
  }
}

export async function handleSendMessage(
  ctx: AuthorizedContext,
  body: string,
  userID: number,
  disableEmail?: boolean
): Promise<boolean> {
  if (ctx.userId === userID) throw GQLError(400, "You cannot message yourself");

  // Avoid rate limit, re-enable with higher limits

  // try {
  //   const result = await getIsMessageProfanity(body);
  //   if (result?.isProfane) {
  //     return false;
  //   }
  // } catch (error) {
  //   // allowing message to send if the profanity check fails
  //   console.error("Error checking profanity:", error);
  // }

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
    const [sender] = await db
      .select({
      name: UserTable.name,
      username: UserTable.username
      })
      .from(UserTable)
      .where(eq(UserTable.id, ctx.userId));
    const message = {
      conversation: conversationID,
      body,
      by: ctx.userId,
    };
    waitUntil(
      sendEvent([
        {
          channel: getUserChannelName(userID),
          name: NEW_MESSAGE,
          data: { ...message, username: sender?.username },
        },
      ])
    );
    await db.insert(ConversationMessageTable).values(message);

    if (!disableEmail)
      waitUntil(
        (async () => {
          const shouldNotify = await shouldSendEmail(conversationID);
          if (shouldNotify && sender) {
            await handleSendEmail(userID, sender, body);
          }
        })()
      );

    return true;
  }
  return false;
}
