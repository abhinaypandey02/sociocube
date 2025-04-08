import { db } from "@backend/lib/db";
import { PostingGQL } from "@graphql/types/Posting/type";
import { withPagination } from "@graphql/utils/pagination";
import { and, eq, getTableColumns } from "drizzle-orm";

import { PostingTable } from "../../db/schema";

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
