import { and, eq } from "drizzle-orm";
import { getConversationChannelName, NEW_MESSAGE } from "config/events";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationMessageTable, ConversationTable } from "../../db/schema";
import { sendEvent } from "../../../../../../lib/socket/send-event";
import { AgencyMember, AgencyTable } from "../../../Agency/db/schema";
import GQLError from "../../../../constants/errors";

export async function handleSendMessage(
  ctx: AuthorizedContext,
  body: string,
  conversationID: number,
): Promise<boolean> {
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
  const [conversation] = await db
    .update(ConversationTable)
    .set({
      hasRead: false,
    })
    .where(and(eq(ConversationTable.id, conversationID)))
    .returning({ id: ConversationTable.id });
  if (!conversation?.id) throw GQLError(404, "Conversation doesnt exist");
  const message = {
    conversation: conversationID,
    body,
    byAgency: Boolean(agency?.agency_member.user === ctx.userId),
  };
  await db.insert(ConversationMessageTable).values(message);
  void sendEvent(
    getConversationChannelName(conversationID),
    NEW_MESSAGE,
    message,
  );
  return true;
  return false;
}
