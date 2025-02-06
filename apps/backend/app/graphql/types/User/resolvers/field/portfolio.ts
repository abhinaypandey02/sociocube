import { eq } from "drizzle-orm";
import { UserDB } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../../Portfolio/db/schema";

export async function getPortfolio(user: UserDB) {
  return db
    .select()
    .from(PortfolioTable)
    .where(eq(PortfolioTable.user, user.id));
}
