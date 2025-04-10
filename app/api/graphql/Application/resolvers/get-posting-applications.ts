import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { desc, eq } from "drizzle-orm";

import { checkPermission } from "../../Posting/utils";
import { ApplicationTable } from "../db";

export async function getPostingApplications(
  ctx: AuthorizedContext,
  postingID: number,
) {
  await checkPermission(ctx, postingID);

  return db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.posting, postingID))
    .orderBy(desc(ApplicationTable.id));
}
