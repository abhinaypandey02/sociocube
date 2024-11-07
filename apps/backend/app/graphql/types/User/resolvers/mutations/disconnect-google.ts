import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import type { Context } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { getCurrentUser } from "../../utils";
import { AuthScopes } from "../../../../constants/scopes";

export async function handleDisconnectGoogle(ctx: Context) {
  if (!ctx.userId) throw GQLError(403);
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403);
  if (user.scopes.length === 0)
    throw GQLError(400, "This is the only way to login");
  await db
    .update(UserTable)
    .set({
      scopes: user.scopes.filter((scope) => scope !== AuthScopes.GOOGLE),
    })
    .where(eq(UserTable.id, ctx.userId));
  if (!user.scopes.includes(AuthScopes.GOOGLE))
    throw GQLError(400, "Google not connected");
  return true;
}
