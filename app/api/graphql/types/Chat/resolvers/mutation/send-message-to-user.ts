import { and, eq } from "drizzle-orm";
import { getConversationChannelName, NEW_MESSAGE } from "@backend/pusher/utils";
import type { AuthorizedContext } from "@graphql/context";
import { db } from "@backend/lib/db";
import { ConversationMessageTable, ConversationTable } from "../../db/schema";
import { sendEvent } from "@backend/lib/socket/send-event";
import GQLError from "../../../../constants/errors";

export async function handleSendMessageToUser(
  ctx: AuthorizedContext,
  body: string,
  userID: number,
): Promise<boolean> {
  if (ctx.userId === userID) throw GQLError(400, "You cannot message yourself");
  const [conversation] = await db
    .update(ConversationTable)
    .set({
      hasRead: false,
    })
    .where(
      and(
        eq(ConversationTable.user, userID),
        eq(ConversationTable.agency, ctx.userId),
      ),
    )
    .returning({ id: ConversationTable.id });
  let conversationID = conversation?.id;
  if (!conversationID) {
    const [newConversation] = await db
      .insert(ConversationTable)
      .values({
        agency: ctx.userId,
        user: userID,
      })
      .returning();
    conversationID = newConversation?.id;
  }
  if (conversationID) {
    const message = {
      conversation: conversationID,
      body,
      byAgency: true,
    };
    await db.insert(ConversationMessageTable).values(message);
    void sendEvent(
      getConversationChannelName(conversationID),
      NEW_MESSAGE,
      message,
    );
    return true;
  }
  return false;
}
