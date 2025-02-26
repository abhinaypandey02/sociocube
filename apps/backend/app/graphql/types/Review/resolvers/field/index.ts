import { FieldResolver, Resolver, Root } from "type-graphql";
import { and, eq, isNotNull } from "drizzle-orm";
import { ReviewGQL } from "../../type";
import { db } from "../../../../../../lib/db";
import { PortfolioDB, PortfolioTable } from "../../../Portfolio/db/schema";
import { PortfolioGQL } from "../../../Portfolio/type";

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
