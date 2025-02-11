import { FieldResolver, Float, Int, Resolver, Root } from "type-graphql";
import { count, eq, sum } from "drizzle-orm";
import { PostingGQL } from "../../type";
import type { PostingDB } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../../Application/db/schema";
import { CountryTable } from "../../../Map/db/schema";
import { AgencyDB, AgencyTable } from "../../../Agency/db/schema";
import { AgencyGQL } from "../../../Agency/type";

@Resolver(() => PostingGQL)
export class PostingFieldResolvers {
  @FieldResolver(() => AgencyGQL)
  async agency(
    @Root() posting: PostingDB,
  ): Promise<AgencyDB | undefined | null> {
    const [agency] = await db
      .select()
      .from(AgencyTable)
      .where(eq(AgencyTable.id, posting.agency));
    return agency;
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
