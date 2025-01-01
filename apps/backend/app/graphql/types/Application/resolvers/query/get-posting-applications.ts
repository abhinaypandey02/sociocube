import { and, eq, getTableColumns } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { PostingTable } from "../../../Posting/db/schema";

export async function getPostingApplications(
  ctx: AuthorizedContext,
  postingID: number,
) {
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
