import { db } from "@backend/lib/db";
import { withPagination } from "@backend/lib/utils/pagination";
import { PostingGQL } from "@graphql/Posting/type";
import { and, eq, getTableColumns } from "drizzle-orm";

import { PostingTable } from "../db";

export async function getAllPostings(page: number): Promise<PostingGQL[]> {
  return withPagination(
    db
      .select(getTableColumns(PostingTable))
      .from(PostingTable)
      .where(and(eq(PostingTable.open, true))),
    {
      page,
      pageSize: 5,
    },
  );
}
