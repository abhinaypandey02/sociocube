import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { InstagramDetails } from "../../Instagram/db";
import { UserTable } from "../db";
import { getCurrentUser } from "../utils";

export async function handleDisconnectInstagram(ctx: AuthorizedContext) {
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403);
  if (user.instagramDetails) {
    await db
      .update(UserTable)
      .set({
        instagramDetails: null,
      })
      .where(eq(UserTable.id, ctx.userId));
    if (user.instagramDetails)
      await db
        .delete(InstagramDetails)
        .where(eq(InstagramDetails.id, user.instagramDetails));
  }
  return true;
}
