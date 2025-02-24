import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { ReviewTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";

export function getPendingReviews(ctx: AuthorizedContext) {
  return db
    .select()
    .from(ReviewTable)
    .where(
      and(eq(ReviewTable.user, ctx.userId), isNull(ReviewTable.agencyRating)),
    );
}
