import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { CitySelectOption } from "@backend/lib/utils/select-options";
import { and, count, eq, inArray, isNotNull, ne, sum } from "drizzle-orm";
import { Ctx, FieldResolver, Float, Int, Resolver, Root } from "type-graphql";

import { ApplicationStatus, ApplicationTable } from "../Application/db";
import { CityTable, CountryTable, StateTable } from "../Map/db";
import { ReviewTable } from "../Review/db";
import { ReviewGQL } from "../Review/type";
import type { UserDB } from "../User/db";
import { UserTable } from "../User/db";
import { UserGQL } from "../User/type";
import type { PostingDB } from "./db";
import {
  getRecommendations,
  Recommendation,
} from "./resolvers/get-recommendations";
import { PostingGQL } from "./type";

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
      .where(
        and(
          eq(ApplicationTable.posting, posting.id),
          ne(ApplicationTable.status, ApplicationStatus.Shortlisted),
        ),
      );
    return applications?.count || 0;
  }

  @FieldResolver(() => Int)
  async selectedCount(@Root() posting: PostingDB): Promise<number> {
    const [applications] = await db
      .select({ count: count() })
      .from(ApplicationTable)
      .where(
        and(
          eq(ApplicationTable.posting, posting.id),
          eq(ApplicationTable.status, ApplicationStatus.Selected),
        ),
      );
    return applications?.count || 0;
  }

  @FieldResolver(() => [Recommendation])
  async recommendations(@Root() posting: PostingDB, @Ctx() ctx: Context) {
    return getRecommendations(posting, ctx);
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
        ),
      )
      .innerJoin(UserTable, eq(UserTable.id, ReviewTable.user));
    return data.map((res) => ({
      rating: res.review.agencyRating || 0,
      feedback: res.review.agencyFeedback,
      name: res.user.name || "",
      photo: res.user.photo,
      username: res.user.username || "",
    }));
  }
  @FieldResolver(() => [CitySelectOption])
  async cities(@Root() posting: PostingDB): Promise<CitySelectOption[]> {
    if (!posting.cities || !posting.cities.length) return [];
    const cities = await db
      .select()
      .from(CityTable)
      .where(inArray(CityTable.id, posting.cities));
    return cities.map((city) => ({
      value: city.id,
      label: city.name,
    }));
  }
  @FieldResolver(() => [CitySelectOption])
  async states(@Root() posting: PostingDB): Promise<CitySelectOption[]> {
    if (!posting.states || !posting.states.length) return [];
    const cities = await db
      .select()
      .from(StateTable)
      .where(inArray(StateTable.id, posting.states));
    return cities.map((city) => ({
      value: city.id,
      label: city.name,
    }));
  }
}
