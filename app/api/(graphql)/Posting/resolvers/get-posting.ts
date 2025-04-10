import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { PostingTable } from "../db";

export async function getPosting(id: number) {
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, id));
  return posting;
}
