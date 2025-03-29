import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "../../../../../../../lib/db";
import { ReviewTable } from "../../db/schema";
import type { AuthorizedContext } from "../../../../context";
import { getReviewDeadline } from "../../utils";

export async function getPendingReviews(ctx: AuthorizedContext) {
  const reviews = await db
    .select()
    .from(ReviewTable)
    .where(
      and(
        eq(ReviewTable.user, ctx.userId),
        isNull(ReviewTable.agencyRating),
        gt(ReviewTable.createdAt, getReviewDeadline()),
      ),
    );
  return reviews.map(({ posting }) => posting);
}
