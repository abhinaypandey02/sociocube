import { db } from "@backend/lib/db";
import type { Context } from "@graphql/context";
import { desc, eq } from "drizzle-orm";

import { PostingTable } from "../../db/schema";

export async function getUserPostings(ctx: Context) {
  if (!ctx.userId) return [];
  return db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.agency, ctx.userId))
    .orderBy(desc(PostingTable.id));
}
