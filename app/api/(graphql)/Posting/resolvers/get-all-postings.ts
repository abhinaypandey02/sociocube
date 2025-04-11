import { db } from "@backend/lib/db";
import { withPagination } from "@backend/lib/utils/pagination";
import { PostingGQL } from "@graphql/Posting/type";
import { eq } from "drizzle-orm";

import { PostingTable } from "../db";

export async function getAllPostings(
  page: number,
  postingID?: number,
): Promise<PostingGQL[]> {
  const results = await withPagination(
    db.select().from(PostingTable).where(eq(PostingTable.open, true)),
    {
      page,
      pageSize: 5,
    },
  );
  if (postingID) {
    const [posting] = await db
      .select()
      .from(PostingTable)
      .where(eq(PostingTable.id, postingID));
    if (posting) results.unshift(posting);
  }
  return results;
}
