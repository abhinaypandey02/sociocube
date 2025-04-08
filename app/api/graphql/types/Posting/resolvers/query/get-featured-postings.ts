import { db } from "@backend/lib/db";
import { and, count, desc, eq, getTableColumns } from "drizzle-orm";

import { ApplicationTable } from "../../../Application/db/schema";
import { PostingTable } from "../../db/schema";

export async function getFeaturedPostings() {
  return db
    .select(getTableColumns(PostingTable))
    .from(PostingTable)
    .where(and(eq(PostingTable.open, true)))
    .innerJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
    .groupBy(PostingTable.id)
    .orderBy(desc(count(ApplicationTable.id)))
    .limit(5);
}
