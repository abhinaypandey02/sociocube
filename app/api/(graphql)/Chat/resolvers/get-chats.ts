import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { arrayContains, getTableColumns } from "drizzle-orm";

import { ConversationTable } from "../db";
import type { ConversationGQL } from "../type";

export async function handleGetChats(ctx: Context): Promise<ConversationGQL[]> {
  if (!ctx.userId) return [];
  return db
    .select(getTableColumns(ConversationTable))
    .from(ConversationTable)
    .where(arrayContains(ConversationTable.users, [ctx.userId]));
}
