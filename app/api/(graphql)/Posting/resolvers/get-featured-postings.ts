import { db } from "@backend/lib/db";
import { and, count, desc, eq, getTableColumns, ne } from "drizzle-orm";

import { ApplicationTable } from "../../Application/db";
import { PostingTable } from "../db";

export async function getFeaturedPostings() {
  const others = await db
    .select(getTableColumns(PostingTable))
    .from(PostingTable)
    .where(
      and(
        eq(PostingTable.open, true),
        eq(PostingTable.inReview, false),
        ne(PostingTable.agency, 134),
      ),
    )
    .leftJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
    .groupBy(PostingTable.id)
    .orderBy(desc(count(ApplicationTable.id)))
    .limit(8);
  if (others.length === 8) return others;
  const ours = await db
    .select(getTableColumns(PostingTable))
    .from(PostingTable)
    .where(and(eq(PostingTable.open, true), ne(PostingTable.id, 62)))
    .innerJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
    .groupBy(PostingTable.id)
    .orderBy(desc(count(ApplicationTable.id)))
    .limit(8 - others.length);
  return [...others, ...ours];
}
