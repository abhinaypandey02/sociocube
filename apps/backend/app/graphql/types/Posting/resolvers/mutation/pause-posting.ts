import { and, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";

export async function pausePosting(
  ctx: AuthorizedContext,
  postingID: number,
): Promise<boolean> {
  await db
    .update(PostingTable)
    .set({ open: false })
    .where(
      and(eq(PostingTable.id, postingID), eq(PostingTable.user, ctx.userId)),
    );
  return true;
}
