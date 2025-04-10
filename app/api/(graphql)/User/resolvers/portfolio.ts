import { db } from "@backend/lib/db";
import { and, eq, isNull } from "drizzle-orm";

import { PortfolioTable } from "../../Portfolio/db";
import type { UserDB } from "../db";

export async function getPortfolio(user: UserDB) {
  return db
    .select()
    .from(PortfolioTable)
    .where(
      and(eq(PortfolioTable.user, user.id), isNull(PortfolioTable.agency)),
    );
}
