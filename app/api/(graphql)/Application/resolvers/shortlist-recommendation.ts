import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { and, eq } from "drizzle-orm";

import { PostingTable } from "../../Posting/db";
import { ApplicationStatus, ApplicationTable } from "../db";

export async function shortlistUser(
  ctx: AuthorizedContext,
  userID: number,
  postingID: number,
) {
  const [res] = await db
    .select()
    .from(PostingTable)
    .where(
      and(eq(PostingTable.id, postingID), eq(PostingTable.agency, ctx.userId)),
    );
  if (!res) throw GQLError(404, "User does not have permission");
  const [existingApplication] = await db
    .select()
    .from(ApplicationTable)
    .where(
      and(
        eq(ApplicationTable.posting, postingID),
        eq(ApplicationTable.user, userID),
      ),
    );
  if (existingApplication) throw GQLError(404, "User already applied");
  await db.insert(ApplicationTable).values({
    status: ApplicationStatus.Shortlisted,
    user: userID,
    posting: postingID,
    external: !!res.externalLink,
  });
  return true;
}
