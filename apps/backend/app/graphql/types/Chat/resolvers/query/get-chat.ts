import { and, eq, getTableColumns, or } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationTable } from "../../db/schema";
import { ConversationGQL } from "../../type";
import { AgencyMember } from "../../../Agency/db/schema";

export async function handleGetChat(
  ctx: AuthorizedContext,
  conversationID: number,
): Promise<ConversationGQL | null> {
  const [conversation] = await db
    .select(getTableColumns(ConversationTable))
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
  return conversation || null;
}
