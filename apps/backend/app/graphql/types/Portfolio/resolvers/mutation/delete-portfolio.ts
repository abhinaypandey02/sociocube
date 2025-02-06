import { and, eq } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";
import { deleteImage } from "../../../../../../lib/storage/aws-s3";

export async function deletePortfolio(ctx: AuthorizedContext, id: number) {
  const [deleted] = await db
    .delete(PortfolioTable)
    .where(and(eq(PortfolioTable.id, id), eq(PortfolioTable.user, ctx.userId)))
    .returning();
  if (!deleted) return false;
  await deleteImage(deleted.imageURL);
  return true;
}
