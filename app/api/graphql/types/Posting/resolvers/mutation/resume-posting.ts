import { and, eq } from "drizzle-orm";
import { db } from "@backend/lib/db";
import { PostingTable } from "../../db/schema";
import type { AuthorizedContext } from "@graphql/context";
import { checkPermission } from "../../utils";

export async function resumePosting(
  ctx: AuthorizedContext,
  postingID: number,
): Promise<boolean> {
  await checkPermission(ctx, postingID);

  await db
    .update(PostingTable)
    .set({ open: true })
    .where(and(eq(PostingTable.id, postingID)));
  return true;
}
