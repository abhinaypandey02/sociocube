import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { and, desc, eq, ne } from "drizzle-orm";

import { checkPermission } from "../../Posting/utils";
import { ApplicationStatus, ApplicationTable } from "../db";

export async function getPostingApplications(ctx: Context, postingID: number) {
  if (!ctx.userId) return [];
  if (!(await checkPermission(ctx, postingID))) return [];
  return db
    .select()
    .from(ApplicationTable)
    .where(
      and(
        eq(ApplicationTable.posting, postingID),
        ne(ApplicationTable.status, ApplicationStatus.Shortlisted),
      ),
    )
    .orderBy(desc(ApplicationTable.id));
}
