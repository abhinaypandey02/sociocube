import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { arrayContains, desc, getTableColumns, sql } from "drizzle-orm";

import { ConversationMessageTable, ConversationTable } from "../db";
import type { ConversationGQL } from "../type";

export async function handleGetChats(ctx: Context): Promise<ConversationGQL[]> {
  if (!ctx.userId) return [];
  return db
    .select(getTableColumns(ConversationTable))
    .from(ConversationTable)
    .where(arrayContains(ConversationTable.users, [ctx.userId]))
    .orderBy(
      desc(
        sql`(
          SELECT MAX(${ConversationMessageTable.createdAt}) 
          FROM ${ConversationMessageTable} 
          WHERE ${ConversationMessageTable.conversation} = ${ConversationTable.id}
        )`,
      ),
    );
}
