import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../db/schema";

export async function applyToPosting(
  ctx: AuthorizedContext,
  postingID: number,
  email: string,
  comment: string | null,
) {
  await db.insert(ApplicationTable).values({
    posting: postingID,
    comment,
    email,
    user: ctx.userId,
  });
  return true;
}
