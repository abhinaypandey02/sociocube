import { and, eq } from "drizzle-orm";
import { getConversationChannelName, NEW_MESSAGE } from "config/events";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationMessageTable, ConversationTable } from "../../db/schema";
import { sendEvent } from "../../../../../../lib/socket/send-event";
import { AgencyMember, AgencyTable } from "../../../Agency/db/schema";
import GQLError from "../../../../constants/errors";

export async function handleSendMessageToUser(
  ctx: AuthorizedContext,
  body: string,
  userID: number,
): Promise<boolean> {
  if (ctx.userId === userID) throw GQLError(400, "You cannot message yourself");
  const [agency] = await db
    .select()
    .from(AgencyTable)
    .innerJoin(
      AgencyMember,
      and(
        eq(AgencyMember.agency, AgencyTable.id),
        eq(AgencyMember.user, ctx.userId),
      ),
    );
  const userAgencyID = agency?.agency.id;
  if (!userAgencyID) throw GQLError(400, "You dont have an agency");
  const [conversation] = await db
    .update(ConversationTable)
    .set({
      hasRead: false,
    })
    .where(
      and(
        eq(ConversationTable.user, userID),
        eq(ConversationTable.agency, userAgencyID),
      ),
    )
    .returning({ id: ConversationTable.id });
  let conversationID = conversation?.id;
  if (!conversationID) {
    const [newConversation] = await db
      .insert(ConversationTable)
      .values({
        agency: userAgencyID,
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
