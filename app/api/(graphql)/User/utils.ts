import { db, DBTransaction } from "@backend/lib/db";
import { eq, type SQL } from "drizzle-orm";

import { USERNAME_REGEX } from "@/constants/regex";

import type { Context } from "../../lib/auth/context";
import { type UserDBInsert, UserTable } from "./db";

export async function getUser(filter: SQL, tx?: DBTransaction) {
  const [user] = await (tx || db).select().from(UserTable).where(filter);
  return user;
}

export async function createUser(data: UserDBInsert, tx?: DBTransaction) {
  const [user] = await (tx || db)
    .insert(UserTable)
    .values(data)
    .returning({ id: UserTable.id });
  return user;
}

export const getCurrentUser = (ctx: Context) => {
  if (!ctx.userId) return null;
  return getUser(eq(UserTable.id, ctx.userId));
};

export function usernameAllowed(username: string) {
  return USERNAME_REGEX.test(username);
}
