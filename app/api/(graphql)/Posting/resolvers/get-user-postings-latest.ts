import { db } from "@backend/lib/db";
import { UserTable } from "@graphql/User/db";
import { desc, eq, and } from "drizzle-orm";

import { PostingGQL } from "../type";
import { PostingTable } from "../db";

export async function getUserPostingsLatest(
  limit: number,
  username: string
): Promise<PostingGQL[]> {
  const agencyId = await db
    .select({ id: UserTable.id })
    .from(UserTable)
    .where(eq(UserTable.username, username));

  if (!agencyId[0]) {
    return [];
  }

  const postings = await db
    .select()
    .from(PostingTable)
    .where(
      and(
        eq(PostingTable.open, true),
        eq(PostingTable.inReview, false),
        eq(PostingTable.agency, agencyId[0].id)
      )
    )
    .orderBy(desc(PostingTable.createdAt))
    .limit(limit);

  return postings;
}
