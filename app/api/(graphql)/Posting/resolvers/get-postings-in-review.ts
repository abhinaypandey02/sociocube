import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { PostingTable } from "../db";

export async function handleGetPostingsInReview() {
  return db.select().from(PostingTable).where(eq(PostingTable.inReview, true));
}
