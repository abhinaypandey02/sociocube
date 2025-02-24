import { and, eq, isNotNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ReviewTable } from "../../db/schema";
import { checkPermission } from "../../../Posting/utils";
import GQLError from "../../../../constants/errors";
import { PortfolioTable } from "../../../Portfolio/db/schema";

export async function rejectPortfolio(
  ctx: AuthorizedContext,
  reviewID: number,
) {
  const [q] = await db
    .select()
    .from(ReviewTable)
    .where(eq(ReviewTable.id, reviewID))
    .innerJoin(PortfolioTable, eq(PortfolioTable.id, ReviewTable.portfolio));
  if (!q?.portfolio) throw GQLError(404, "No review found!");
  if (q.portfolio.agency) throw GQLError(400, "Already accepted.");
  await checkPermission(ctx, q.review.posting);
  const res = await db
    .update(ReviewTable)
    .set({
      portfolio: null,
    })
    .where(and(eq(ReviewTable.id, reviewID), isNotNull(ReviewTable.portfolio)));
  return res.length === 1;
}
