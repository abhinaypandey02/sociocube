import { and, eq, getTableColumns, isNotNull, isNull } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { ReviewTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { AgencyMember } from "../../../Agency/db/schema";
import { PortfolioTable } from "../../../Portfolio/db/schema";

export function getPendingPortfolios(ctx: AuthorizedContext) {
  return db
    .select(getTableColumns(ReviewTable))
    .from(ReviewTable)
    .where(
      and(
        isNotNull(ReviewTable.portfolio),
        isNotNull(ReviewTable.agencyRating),
      ),
    )
    .innerJoin(
      AgencyMember,
      and(
        eq(AgencyMember.user, ctx.userId),
        eq(AgencyMember.agency, ReviewTable.agency),
      ),
    )
    .innerJoin(
      PortfolioTable,
      and(
        eq(PortfolioTable.id, ReviewTable.portfolio),
        isNull(PortfolioTable.agency),
      ),
    );
}
