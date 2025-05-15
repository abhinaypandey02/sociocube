import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { and, eq } from "drizzle-orm";

import { ApplicationStatus, ApplicationTable } from "../db";

export async function updateShortlist(
  ctx: AuthorizedContext,
  id: number,
  accepted: boolean,
) {
  await db
    .update(ApplicationTable)
    .set({
      status: ApplicationStatus.Selected,
    })
    .where(
      and(
        eq(ApplicationTable.id, id),
        eq(
          ApplicationTable.status,
          accepted ? ApplicationStatus.Shortlisted : ApplicationStatus.Denied,
        ),
        eq(ApplicationTable.user, ctx.userId),
      ),
    );
  return true;
}
