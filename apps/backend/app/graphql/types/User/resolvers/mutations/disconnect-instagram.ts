import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import type { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { getCurrentUser } from "../../utils";
import { AuthScopes } from "../../../../constants/scopes";
import { InstagramDetails } from "../../../Instagram/db/schema";

export async function handleDisconnectInstagram(ctx: AuthorizedContext) {
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403);

  if (user.scopes.length === 0)
    throw GQLError(400, "This is the only way to login");
  await db
    .update(UserTable)
    .set({
      instagramDetails: null,
      scopes: user.scopes.filter((scope) => scope !== AuthScopes.INSTAGRAM),
      isOnboarded: false,
    })
    .where(eq(UserTable.id, ctx.userId));
  if (user.instagramDetails)
    await db
      .delete(InstagramDetails)
      .where(eq(InstagramDetails.id, user.instagramDetails));
  if (!user.scopes.includes(AuthScopes.INSTAGRAM) || !user.instagramDetails)
    throw GQLError(400, "Instagram not connected");
  return true;
}
