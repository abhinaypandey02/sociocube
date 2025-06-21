import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import { UserTable } from "../db";

export async function handleChangePassword(
  ctx: AuthorizedContext,
  oldPassword: string,
  newPassword: string,
) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, ctx.userId));
  if (!user?.password) throw GQLError(403, "User not found");
  const valid = await compare(oldPassword, user.password);
  if (!valid) throw GQLError(400, "Incorrect current password");
  if (oldPassword === newPassword) return true;
  await db
    .update(UserTable)
    .set({ password: await hash(newPassword, 10) })
    .where(eq(UserTable.id, ctx.userId));
  return true;
}
