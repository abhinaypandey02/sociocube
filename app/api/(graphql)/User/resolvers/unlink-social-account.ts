import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { InstagramDetails } from "../../Instagram/db";
import { UserTable } from "../db";
import { getCurrentUser } from "../utils";

export async function handleUnlinkSocialAccount(ctx: AuthorizedContext) {
  const user = await getCurrentUser(ctx);
  if (user?.instagramDetails) {
    await db
      .update(InstagramDetails)
      .set({
        isVerified: false,
      })
      .where(eq(InstagramDetails.id, user.instagramDetails));
    await db
      .update(UserTable)
      .set({
        instagramDetails: null,
      })
      .where(eq(UserTable.id, ctx.userId));
    return true;
  }
  return false;
}
