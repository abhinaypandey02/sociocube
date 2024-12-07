import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../db/schema";

export async function applyToPosting(
  ctx: AuthorizedContext,
  postingID: number,
  comment: string | null,
) {
  await db.insert(ApplicationTable).values({
    posting: postingID,
    comment,
    user: ctx.userId,
  });
}
