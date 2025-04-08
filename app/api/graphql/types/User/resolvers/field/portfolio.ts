import { db } from "@backend/lib/db";
import { and, eq, isNull } from "drizzle-orm";

import { PortfolioTable } from "../../../Portfolio/db/schema";
import type { UserDB } from "../../db/schema";

export async function getPortfolio(user: UserDB) {
  return db
    .select()
    .from(PortfolioTable)
    .where(
      and(eq(PortfolioTable.user, user.id), isNull(PortfolioTable.agency)),
    );
}
