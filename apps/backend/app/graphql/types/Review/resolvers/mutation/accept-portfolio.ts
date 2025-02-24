import { and, eq, isNotNull, isNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ReviewTable } from "../../db/schema";
import { checkPermission } from "../../../Posting/utils";
import GQLError from "../../../../constants/errors";
import { PortfolioTable } from "../../../Portfolio/db/schema";

export async function acceptPortfolio(
  ctx: AuthorizedContext,
  reviewID: number,
) {
  const [review] = await db
    .select()
    .from(ReviewTable)
    .where(eq(ReviewTable.id, reviewID));
  if (!review?.portfolio) throw GQLError(404, "No review found!");
  const agency = await checkPermission(ctx, review.posting);
  const res = await db
    .update(PortfolioTable)
    .set({
      agency,
    })
    .where(
      and(
        eq(PortfolioTable.id, review.portfolio),
        isNull(PortfolioTable.agency),
        isNotNull(PortfolioTable.user),
      ),
    );
  return res.length === 1;
}
