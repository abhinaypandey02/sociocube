import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { desc, eq } from "drizzle-orm";

import { checkPermission } from "../../Posting/utils";
import { ApplicationTable } from "../db";

export async function getPostingApplications(ctx: Context, postingID: number) {
  if (!ctx.userId) return [];
  if (!(await checkPermission(ctx, postingID))) return [];
  return db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.posting, postingID))
    .orderBy(desc(ApplicationTable.id));
}
