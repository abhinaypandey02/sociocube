import { desc, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";

export async function getAllPostings() {
  return db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.open, true))
    .orderBy(desc(PostingTable.minimumInstagramFollower))
    .limit(20);
}
