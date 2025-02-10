import { and, eq, or } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationMessageTable, ConversationTable } from "../../db/schema";
import { AgencyMember } from "../../../Agency/db/schema";

export async function handleReadMessage(
  ctx: AuthorizedContext,
  conversationID: number,
): Promise<boolean> {
  const [conversation] = await db
    .select()
    .from(ConversationTable)
    .innerJoin(
      AgencyMember,
      and(
        eq(AgencyMember.agency, ConversationTable.agency),
        eq(ConversationTable.id, conversationID),
      ),
    )
    .where(
      or(
        eq(AgencyMember.user, ctx.userId),
        eq(ConversationTable.user, ctx.userId),
      ),
    );
  const isAgencyMember = ctx.userId === conversation?.agency_member.user;
  const [lastMessage] = await db
    .select()
    .from(ConversationMessageTable)
    .where(or(eq(ConversationMessageTable.byAgency, isAgencyMember)))
    .limit(1);
  if (lastMessage)
    await db
      .update(ConversationTable)
      .set({
        hasRead: true,
      })
      .where(and(eq(ConversationTable.id, conversationID)));
  return true;
}
