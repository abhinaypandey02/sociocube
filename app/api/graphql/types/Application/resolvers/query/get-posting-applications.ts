import { desc, eq } from "drizzle-orm";
import { db } from "@backend/lib/db";
import type { AuthorizedContext } from "@graphql/context";
import { ApplicationTable } from "../../db/schema";
import { checkPermission } from "../../../Posting/utils";

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
