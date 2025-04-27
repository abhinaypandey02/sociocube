import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { and, eq } from "drizzle-orm";

import { PostingTable } from "../../Posting/db";
import { ApplicationStatus, ApplicationTable } from "../db";

export async function likeApplication(ctx: AuthorizedContext, id: number) {
  const [res] = await db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.id, id))
    .innerJoin(
      PostingTable,
      and(
        eq(PostingTable.id, ApplicationTable.posting),
        eq(PostingTable.agency, ctx.userId),
      ),
    );
  if (!res) throw GQLError(404, "User does not have permission");
  if (res.application.status === ApplicationStatus.Rejected) {
    throw GQLError(404, "Application completed");
  }
  if (res.application.status === ApplicationStatus.Selected) return true;
  await db
    .update(ApplicationTable)
    .set({
      status: ApplicationStatus.Selected,
    })
    .where(eq(ApplicationTable.id, id));
  return true;
}
