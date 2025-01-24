import { FieldResolver, Float, Int, Resolver, Root } from "type-graphql";
import { count, eq, sum } from "drizzle-orm";
import { UserGQL } from "../../../User/type";
import { PostingGQL } from "../../type";
import type { PostingDB } from "../../db/schema";
import { getCurrentUser } from "../../../User/utils";
import { UserDB } from "../../../User/db/schema";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../../Application/db/schema";
import { CountryTable } from "../../../Map/db/schema";

@Resolver(() => PostingGQL)
export class PostingFieldResolvers {
  @FieldResolver(() => UserGQL, { nullable: true })
  async user(@Root() posting: PostingDB): Promise<UserDB | undefined | null> {
    return getCurrentUser({
      userId: posting.user,
    });
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
}
