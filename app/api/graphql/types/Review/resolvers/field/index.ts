import { db } from "@backend/lib/db";
import { and, eq, isNotNull } from "drizzle-orm";
import { FieldResolver, Resolver, Root } from "type-graphql";

import type { PortfolioDB } from "../../../Portfolio/db/schema";
import { PortfolioTable } from "../../../Portfolio/db/schema";
import { PortfolioGQL } from "../../../Portfolio/type";
import { ReviewGQL } from "../../type";

@Resolver(() => ReviewGQL)
export class ReviewFieldResolvers {
  @FieldResolver(() => PortfolioGQL, { nullable: true })
  async portfolio(
    @Root() review: ReviewGQL,
  ): Promise<PortfolioDB | undefined | null> {
    if (!review.portfolio) return null;
    const [portfolio] = await db
      .select()
      .from(PortfolioTable)
      .where(
        and(
          eq(PortfolioTable.id, review.portfolio),
          isNotNull(PortfolioTable.user),
          isNotNull(PortfolioTable.agency),
        ),
      );
    return portfolio;
  }
}
