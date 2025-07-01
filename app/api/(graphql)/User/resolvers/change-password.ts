import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { compare, hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import { sendTemplateEmail } from "@/app/api/lib/email/send-template";
import { getRoute } from "@/constants/routes";

import { UserDB, UserTable } from "../db";

async function handleSendEmail(user: UserDB) {
  if (user.emailVerified) {
    await sendTemplateEmail(user.email, "PasswordChange", {
      name: user.name || "",
      link: getRoute("Forgot"),
    });
  }
}

export async function handleChangePassword(
  ctx: AuthorizedContext,
  oldPassword: string,
  newPassword: string,
) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, ctx.userId));
  if (!user) throw GQLError(404, "User not found");
  if (user?.password) {
    const valid = await compare(oldPassword, user.password);
    if (!valid) throw GQLError(400, "Incorrect current password");
  }
  if (oldPassword === newPassword) {
    await handleSendEmail(user);
    return true;
  }
  await db
    .update(UserTable)
    .set({ password: await hash(newPassword, 10) })
    .where(eq(UserTable.id, ctx.userId));

  await handleSendEmail(user);
  return true;
}
