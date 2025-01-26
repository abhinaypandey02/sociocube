import { eq } from "drizzle-orm";
import { TEAM_USER_ID } from "commons/referral";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";

export async function getUserPostings(ctx: AuthorizedContext) {
  if (ctx.userId === TEAM_USER_ID) return db.select().from(PostingTable);
  return db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.user, ctx.userId));
}
