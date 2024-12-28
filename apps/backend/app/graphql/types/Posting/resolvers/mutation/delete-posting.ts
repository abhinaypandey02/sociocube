import { and, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { ApplicationTable } from "../../../Application/db/schema";
import GQLError from "../../../../constants/errors";

export async function deletePosting(
  ctx: AuthorizedContext,
  postingID: number,
): Promise<boolean> {
  const applications = await db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.posting, postingID));
  if (applications.length > 0)
    throw GQLError(400, "Already received applications");
  await db
    .delete(PostingTable)
    .where(
      and(eq(PostingTable.id, postingID), eq(PostingTable.user, ctx.userId)),
    );
  return true;
}
