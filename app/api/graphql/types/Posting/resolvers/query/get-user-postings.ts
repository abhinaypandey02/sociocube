import { desc, eq } from "drizzle-orm";
import type { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../lib/db";
import { PostingTable } from "../../db/schema";

export async function getUserPostings(ctx: AuthorizedContext) {
  return db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.agency, ctx.userId))
    .orderBy(desc(PostingTable.id));
}
