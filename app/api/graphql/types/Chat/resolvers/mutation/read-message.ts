import { db } from "@backend/lib/db";
import type { AuthorizedContext } from "@graphql/context";
import { and, eq, or } from "drizzle-orm";

import { ConversationMessageTable, ConversationTable } from "../../db/schema";

export async function handleReadMessage(
  ctx: AuthorizedContext,
  conversationID: number,
): Promise<boolean> {
  const [conversation] = await db
    .select()
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
  const isAgencyMember = ctx.userId === conversation?.agency;
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
