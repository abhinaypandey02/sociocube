import { and, eq } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";

export async function deletePortfolio(ctx: AuthorizedContext, id: number) {
  await db
    .delete(PortfolioTable)
    .where(and(eq(PortfolioTable.id, id), eq(PortfolioTable.user, ctx.userId)));
  return true;
}
