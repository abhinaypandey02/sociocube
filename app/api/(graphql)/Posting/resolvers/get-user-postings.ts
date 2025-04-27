import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { withPagination } from "@backend/lib/utils/pagination";
import { desc, eq } from "drizzle-orm";

import { PostingTable } from "../db";

export async function getUserPostings(ctx: Context, page: number) {
  if (!ctx.userId) return [];
  return withPagination(
    db
      .select()
      .from(PostingTable)
      .where(eq(PostingTable.agency, ctx.userId))
      .orderBy(desc(PostingTable.id)),
    {
      page,
      pageSize: 20,
    },
  );
}
