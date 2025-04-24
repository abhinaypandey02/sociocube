import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { deleteImage } from "@backend/lib/storage/aws-s3";
import { waitUntil } from "@vercel/functions";
import { and, eq, isNotNull, or } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { getCurrentUser } from "../../User/utils";
import { PortfolioTable } from "../db";

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
  waitUntil(
    (async () => {
      const user = await getCurrentUser(ctx);
      if (user) revalidateTag(`profile-${user.username}`);
      if (deleted.imageURL) await deleteImage(deleted.imageURL);
    })(),
  );
  return true;
}
