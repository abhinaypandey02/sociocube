import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { desc, eq } from "drizzle-orm";

import { ApplicationTable } from "../db";

export function getUserApplications(ctx: Context) {
  if (!ctx.userId) return [];
  return db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.user, ctx.userId))
    .orderBy(desc(ApplicationTable.id));
}
