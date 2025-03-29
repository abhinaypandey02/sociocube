import { FieldResolver, Float, Int, Resolver, Root } from "type-graphql";
import { and, count, eq, isNotNull, sum } from "drizzle-orm";
import { PostingGQL } from "../../type";
import type { PostingDB } from "../../db/schema";
import { db } from "@backend/lib/db";
import { ApplicationTable } from "../../../Application/db/schema";
import { CountryTable } from "../../../Map/db/schema";
import { ReviewGQL } from "../../../Review/type";
import { ReviewTable } from "../../../Review/db/schema";
import type { UserDB } from "../../../User/db/schema";
import { UserTable } from "../../../User/db/schema";
import { PortfolioTable } from "../../../Portfolio/db/schema";
import { UserGQL } from "../../../User/type";

@Resolver(() => PostingGQL)
export class PostingFieldResolvers {
  @FieldResolver(() => UserGQL)
  async agency(@Root() posting: PostingDB): Promise<UserDB | undefined | null> {
    const [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, posting.agency));
    return user;
  }
  @FieldResolver(() => String, { nullable: true })
  async currency(
    @Root() posting: PostingDB,
  ): Promise<string | undefined | null> {
    if (!posting.currencyCountry) return null;
    const [country] = await db
      .select({
        currency: CountryTable.currencySymbol,
      })
      .from(CountryTable)
      .where(eq(CountryTable.id, posting.currencyCountry));
    return country?.currency;
  }
  @FieldResolver(() => Float)
  async referralEarnings(@Root() posting: PostingDB): Promise<number> {
    const [applications] = await db
      .select({ total: sum(ApplicationTable.referralEarnings) })
      .from(ApplicationTable)
      .where(eq(ApplicationTable.posting, posting.id));
    return parseFloat(applications?.total || "0");
  }
  @FieldResolver(() => Int)
  async applicationsCount(@Root() posting: PostingDB): Promise<number> {
    const [applications] = await db
      .select({ count: count() })
      .from(ApplicationTable)
      .where(eq(ApplicationTable.posting, posting.id));
    return applications?.count || 0;
  }

  @FieldResolver(() => [ReviewGQL])
  async reviews(@Root() posting: PostingDB): Promise<ReviewGQL[]> {
    const data = await db
      .select()
      .from(ReviewTable)
      .where(
        and(
          eq(ReviewTable.posting, posting.id),
          isNotNull(ReviewTable.agencyRating),
          isNotNull(ReviewTable.portfolio),
        ),
      )
      .innerJoin(
        PortfolioTable,
        and(
          eq(PortfolioTable.id, ReviewTable.portfolio),
          isNotNull(PortfolioTable.user),
          isNotNull(PortfolioTable.agency),
        ),
      )
      .innerJoin(UserTable, eq(UserTable.id, ReviewTable.user));
    return data.map((res) => ({
      rating: res.review.agencyRating || 0,
      feedback: res.review.agencyFeedback,
      name: res.user.name || "",
      photo: res.user.photo,
      username: res.user.username || "",
      portfolio: res.review.portfolio,
    }));
  }
}
