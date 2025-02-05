import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";

export function getUserPortfolio(ctx: AuthorizedContext) {
  return db
    .select()
    .from(PortfolioTable)
    .where(eq(PortfolioTable.user, ctx.userId));
}
