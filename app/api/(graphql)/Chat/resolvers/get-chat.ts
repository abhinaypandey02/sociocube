import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { arrayContains, eq, getTableColumns } from "drizzle-orm";

import { UserTable } from "../../User/db";
import type { ConversationDB } from "../db";
import { ConversationTable } from "../db";

export async function handleGetChat(
  ctx: Context,
  username: string,
): Promise<ConversationDB | null> {
  if (!ctx.userId) return null;
  const [user] = await db
    .select({
      id: UserTable.id,
    })
    .from(UserTable)
    .where(eq(UserTable.username, username));
  if (!user?.id) return null;
  const [conversation] = await db
    .select(getTableColumns(ConversationTable))
    .from(ConversationTable)
    .where(arrayContains(ConversationTable.users, [user.id, ctx.userId]));
  return (
    conversation || {
      users: [user.id, ctx.userId],
      id: -1,
      hasRead: false,
      createdAt: new Date(),
    }
  );
}
