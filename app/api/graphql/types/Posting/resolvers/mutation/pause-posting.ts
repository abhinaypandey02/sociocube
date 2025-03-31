import { and, eq } from "drizzle-orm";
import { db } from "@backend/lib/db";
import type { AuthorizedContext } from "@graphql/context";
import { PostingTable } from "../../db/schema";
import { checkPermission } from "../../utils";

export async function pausePosting(
  ctx: AuthorizedContext,
  postingID: number,
): Promise<boolean> {
  await checkPermission(ctx, postingID);

  await db
    .update(PostingTable)
    .set({ open: false })
    .where(and(eq(PostingTable.id, postingID)));
  return true;
}
