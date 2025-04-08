import { db } from "@backend/lib/db";
import { deleteImage } from "@backend/lib/storage/aws-s3";
import type { AuthorizedContext } from "@graphql/context";
import { and, eq, isNotNull, or } from "drizzle-orm";

import GQLError from "../../../../constants/errors";
import { ReviewTable } from "../../../Review/db/schema";
import { PortfolioTable } from "../../db/schema";

export async function deletePortfolio(ctx: AuthorizedContext, id: number) {
  const [portfolio] = await db
    .select()
    .from(PortfolioTable)
    .where(eq(PortfolioTable.id, id));
  if (!portfolio) throw GQLError(404, "No portfolio found.");
  if (portfolio.user !== ctx.userId)
    throw GQLError(403, "You dont have permission for this agency");
  if (portfolio.agency && portfolio.user) {
    await db
      .update(PortfolioTable)
      .set({
        agency: null,
      })
      .where(eq(PortfolioTable.id, id));
    return true;
  }
  await db
    .update(ReviewTable)
    .set({
      portfolio: null,
    })
    .where(eq(ReviewTable.portfolio, id));
  const [deleted] = await db
    .delete(PortfolioTable)
    .where(
      and(
        eq(PortfolioTable.id, id),
        or(
          eq(PortfolioTable.user, ctx.userId),
          isNotNull(PortfolioTable.agency),
        ),
      ),
    )
    .returning();
  if (!deleted) return false;
  if (deleted.imageURL) await deleteImage(deleted.imageURL);
  return true;
}
