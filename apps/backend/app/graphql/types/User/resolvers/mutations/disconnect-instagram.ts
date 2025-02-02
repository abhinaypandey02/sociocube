import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import type { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { getCurrentUser } from "../../utils";
import { InstagramDetails } from "../../../Instagram/db/schema";

export async function handleDisconnectInstagram(ctx: AuthorizedContext) {
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403);
  if (user.instagramDetails)
    await db
      .update(InstagramDetails)
      .set({ accessToken: null })
      .where(eq(InstagramDetails.id, user.instagramDetails));
  return true;
}
