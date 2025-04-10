import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { ApplicationTable } from "../../Application/db";
import { PostingTable } from "../db";
import { checkPermission } from "../utils";

export async function deletePosting(
  ctx: AuthorizedContext,
  postingID: number,
): Promise<boolean> {
  const applications = await db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.posting, postingID));
  if (applications.length > 0)
    throw GQLError(400, "Already received applications");
  await checkPermission(ctx, postingID);
  await db.delete(PostingTable).where(eq(PostingTable.id, postingID));
  return true;
}
