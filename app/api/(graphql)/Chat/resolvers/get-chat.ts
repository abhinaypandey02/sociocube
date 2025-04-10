import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { and, eq, getTableColumns, or } from "drizzle-orm";

import { ConversationTable } from "../db";
import type { ConversationGQL } from "../type";

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
