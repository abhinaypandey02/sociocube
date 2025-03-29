import { and, eq, getTableColumns, or } from "drizzle-orm";
import type { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../../lib/db";
import { ConversationTable } from "../../db/schema";
import type { ConversationGQL } from "../../type";

export async function handleGetChat(
  ctx: AuthorizedContext,
  conversationID: number,
): Promise<ConversationGQL | null> {
  const [conversation] = await db
    .select(getTableColumns(ConversationTable))
    .from(ConversationTable)
    .where(
      and(
        eq(ConversationTable.id, conversationID),
        or(
          eq(ConversationTable.agency, ctx.userId),
          eq(ConversationTable.user, ctx.userId),
        ),
      ),
    );
  return conversation || null;
}
