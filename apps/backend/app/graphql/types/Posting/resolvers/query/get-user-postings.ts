import { eq } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";

export async function getUserPostings(ctx: AuthorizedContext) {
  return db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.user, ctx.userId));
}
