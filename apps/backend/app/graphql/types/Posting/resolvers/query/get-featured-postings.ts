import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";

export async function getFeaturedPostings() {
  return db
    .select()
    .from(PostingTable)
    .where(and(isNotNull(PostingTable.price), eq(PostingTable.open, true)))
    .orderBy(desc(PostingTable.price))
    .limit(4);
}
