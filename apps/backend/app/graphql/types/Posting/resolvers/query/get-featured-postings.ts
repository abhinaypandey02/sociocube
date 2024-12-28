import { and, desc, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";

export async function getFeaturedPostings() {
  return db
    .select()
    .from(PostingTable)
    .where(and(eq(PostingTable.open, true)))
    .orderBy(desc(PostingTable.createdAt))
    .limit(4);
}
