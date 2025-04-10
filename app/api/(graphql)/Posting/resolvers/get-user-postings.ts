import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { desc, eq } from "drizzle-orm";

import { PostingTable } from "../db";

export async function getUserPostings(ctx: Context) {
  if (!ctx.userId) return [];
  return db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.agency, ctx.userId))
    .orderBy(desc(PostingTable.id));
}
