import { db } from "@backend/lib/db";
import { UserTable } from "@graphql/User/db";
import { and, desc, eq } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";

import { PostingTable } from "../db";
import { PostingGQL } from "../type";

export async function getUserPostingsLatest(
  limit: number = 5,
  username: string,
): Promise<PostingGQL[]> {
  const postings = await db
    .select(getTableColumns(PostingTable))
    .from(PostingTable)
    .innerJoin(UserTable, eq(PostingTable.agency, UserTable.id))
    .where(
      and(
        eq(PostingTable.open, true),
        eq(PostingTable.inReview, false),
        eq(UserTable.username, username),
      ),
    )
    .orderBy(desc(PostingTable.createdAt))
    .limit(limit);

  return postings;
}
