import { eq } from "drizzle-orm";
import { db } from "@backend/lib/db";
import { PostingTable } from "../../db/schema";

export async function getPosting(id: number) {
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, id));
  return posting;
}
