import { and, eq, isNotNull, lte, or } from "drizzle-orm";
import { UserDB } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { ReviewTable } from "../../../Review/db/schema";
import { getReviewDeadline } from "../../../Review/utils";
import { AgencyDB, AgencyTable } from "../../../Agency/db/schema";

export async function getReviews(user: UserDB | AgencyDB) {
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
    .innerJoin(AgencyTable, eq(AgencyTable.id, ReviewTable.agency));
  return data.map((res) => ({
    rating: res.review.userRating,
    feedback: res.review.userFeedback,
    name: res.agency.name || "",
    photo: res.agency.photo,
    username: res.agency.username,
  }));
}
