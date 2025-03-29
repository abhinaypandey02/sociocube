import { and, eq, isNotNull, lte, or } from "drizzle-orm";
import type { UserDB } from "../../db/schema";
import { UserTable } from "../../db/schema";
import { db } from "../../../../../../../lib/db";
import { ReviewTable } from "../../../Review/db/schema";
import { getReviewDeadline } from "../../../Review/utils";

export async function getReviews(user: UserDB) {
  const data = await db
    .select()
    .from(ReviewTable)
    .where(
      and(
        eq(ReviewTable.user, user.id),
        or(
          isNotNull(ReviewTable.agencyRating),
          lte(ReviewTable.createdAt, getReviewDeadline()),
        ),
      ),
    )
    .innerJoin(UserTable, eq(UserTable.id, ReviewTable.agency));
  return data.map((res) => ({
    rating: res.review.userRating,
    feedback: res.review.userFeedback,
    name: res.user.name || "",
    photo: res.user.photo,
    username: res.user.username || "",
    portfolio: res.review.portfolio,
  }));
}
