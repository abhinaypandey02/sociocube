import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { and, eq, gt, isNull } from "drizzle-orm";

import { ReviewTable } from "../db";
import { getReviewDeadline } from "../utils";

export async function getPendingReviews(ctx: Context) {
  if (!ctx.userId) return [];
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
