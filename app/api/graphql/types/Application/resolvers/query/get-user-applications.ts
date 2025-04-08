import { db } from "@backend/lib/db";
import type { Context } from "@graphql/context";
import { desc, eq } from "drizzle-orm";

import { ApplicationTable } from "../../db/schema";

export function getUserApplications(ctx: Context) {
  if (!ctx.userId) return [];
  return db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.user, ctx.userId))
    .orderBy(desc(ApplicationTable.id));
}
