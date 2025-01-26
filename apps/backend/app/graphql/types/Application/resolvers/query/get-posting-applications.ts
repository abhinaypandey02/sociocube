import { and, eq, getTableColumns } from "drizzle-orm";
import { TEAM_USER_ID } from "commons/referral";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { PostingTable } from "../../../Posting/db/schema";

export async function getPostingApplications(
  ctx: AuthorizedContext,
  postingID: number,
) {
  if (ctx.userId === TEAM_USER_ID)
    return db
      .select(getTableColumns(ApplicationTable))
      .from(ApplicationTable)
      .where(eq(ApplicationTable.posting, postingID));

  return db
    .select(getTableColumns(ApplicationTable))
    .from(ApplicationTable)
    .where(eq(ApplicationTable.posting, postingID))
    .innerJoin(
      PostingTable,
      and(
        eq(ApplicationTable.posting, PostingTable.id),
        eq(PostingTable.user, ctx.userId),
      ),
    );
}
