import { and, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";

export function getPostingApplications(
  ctx: AuthorizedContext,
  postingID: number,
) {
  return db
    .select()
    .from(ApplicationTable)
    .where(
      and(
        eq(ApplicationTable.posting, postingID),
        eq(ApplicationTable.user, ctx.userId),
      ),
    );
}
