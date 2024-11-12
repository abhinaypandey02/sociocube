import { FieldResolver, Resolver, Root } from "type-graphql";
import { eq } from "drizzle-orm";
import {
  Location,
  LocationID,
  OnboardingData,
  Pricing,
  UserGQL,
} from "../type";
import { OnboardingDataTable, PricingTable } from "../db/schema";
import type { UserDB } from "../db/schema";
import { db } from "../../../../../lib/db";
import { FileGQL } from "../../File/type";
import {
  getFileURL,
  getUploadFileURL,
} from "../../../../../lib/storage/aws-s3";
import { getGraphUrl } from "../../../../auth/instagram/utils";
import {
  InstagramMedia,
  InstagramMediaType,
  InstagramStats,
} from "../../Instagram/type";
import { InstagramDetails } from "../../Instagram/db/schema";
import { CityTable, CountryTable } from "../../Map/db/schema";

@Resolver(() => UserGQL)
export class UserFieldResolver {
  @FieldResolver(() => OnboardingData, { nullable: true })
  async onboardingData(@Root() user: UserDB): Promise<OnboardingData | null> {
    if (!user.onboardingData) return null;
    const [data] = await db
      .select()
      .from(OnboardingDataTable)
      .where(eq(OnboardingDataTable.id, user.onboardingData));
    const onboardingData: OnboardingData = {
      ...data,
      pricing: undefined,
    } as OnboardingData;
    if (data?.city) {
      const [res] = await db
        .select()
        .from(CityTable)
        .innerJoin(CountryTable, eq(CountryTable.id, CityTable.countryId))
        .where(eq(CityTable.id, data.city));
      if (res) {
        onboardingData.state = res.cities.stateId;
        onboardingData.country = res.cities.countryId;
        onboardingData.currency = {
          symbol: res.countries.currencySymbol || undefined,
          name: res.countries.currencyName || undefined,
        };
      }
    }
    if (data?.pricing) {
      const [pricing] = await db
        .select()
        .from(PricingTable)
        .where(eq(PricingTable.id, data.pricing));
      if (pricing) {
        onboardingData.pricing = pricing as Pricing;
      }
    }
    return onboardingData;
  }

  @FieldResolver(() => FileGQL)
  async pictureUploadURL(@Root() user: UserDB): Promise<FileGQL> {
    return {
      uploadURL: await getUploadFileURL(
        ["User", user.id.toString(), "photo"],
        true,
      ),
      url: getFileURL(["User", user.id.toString(), "photo"]),
    };
  }

  @FieldResolver(() => Pricing, { nullable: true })
  async pricing(@Root() user: UserDB): Promise<Pricing | null> {
    if (user.pricing) {
      const [pricing] = await db
        .select()
        .from(PricingTable)
        .where(eq(PricingTable.id, user.pricing));
      if (pricing) return pricing as Pricing;
    }
    return null;
  }
  @FieldResolver(() => Location, { nullable: true })
  async location(@Root() user: UserDB): Promise<Location | null> {
    if (user.city) {
      const [city] = await db
        .select()
        .from(CityTable)
        .innerJoin(CountryTable, eq(CountryTable.id, CityTable.countryId))
        .where(eq(CityTable.id, user.city));
      if (city)
        return {
          city: city.cities.name,
          country: city.countries.name,
          currency: {
            symbol: city.countries.currencySymbol || undefined,
            name: city.countries.currencyName || undefined,
          },
        };
    }
    return null;
  }
  @FieldResolver(() => LocationID, { nullable: true })
  async locationID(@Root() user: UserDB): Promise<LocationID | null> {
    if (user.city) {
      const [city] = await db
        .select()
        .from(CityTable)
        .where(eq(CityTable.id, user.city));
      if (city)
        return {
          city: city.id,
          country: city.countryId,
          state: city.stateId,
        };
    }
    return null;
  }

  @FieldResolver(() => Boolean)
  isOnboarded(@Root() user: UserDB): boolean {
    return Boolean(
      user.photo &&
        user.name &&
        user.category &&
        user.gender &&
        user.dob &&
        user.instagramDetails &&
        user.city &&
        user.isOnboarded,
    );
  }

  @FieldResolver(() => InstagramStats, { nullable: true })
  async instagramStats(@Root() user: UserDB): Promise<InstagramStats | null> {
    if (!user.instagramDetails) return null;
    const [instagramDetails] = await db
      .select()
      .from(InstagramDetails)
      .where(eq(InstagramDetails.id, user.instagramDetails));
    if (!instagramDetails) return null;
    if (!instagramDetails.accessToken)
      return {
        username: instagramDetails.username,
        followers: instagramDetails.followers,
        mediaCount: 0,
      };
    const fetchReq = await fetch(
      getGraphUrl("me", instagramDetails.accessToken, [
        "followers_count",
        "media_count",
        "username",
      ]),
    ).then(
      (data) =>
        data.json() as Promise<{
          followers_count?: number;
          media_count?: number;
          username?: string;
          error?: object;
        } | null>,
    );
    if (!fetchReq || fetchReq.error) return null;
    const [fallback] = await db
      .update(InstagramDetails)
      .set({
        followers: fetchReq.followers_count || undefined,
        username: fetchReq.username || undefined,
      })
      .where(eq(InstagramDetails.id, user.instagramDetails))
      .returning();

    const returnedUsername = fetchReq.username || fallback?.username;
    if (!returnedUsername) return null;
    return {
      username: returnedUsername,
      followers: fetchReq.followers_count || fallback?.followers || 0,
      mediaCount: fetchReq.media_count || 0,
    };
  }
  @FieldResolver(() => [InstagramMedia], { nullable: true })
  async instagramMedia(@Root() user: UserDB): Promise<InstagramMedia[] | null> {
    if (!user.instagramDetails) return null;
    const [instagramDetails] = await db
      .select()
      .from(InstagramDetails)
      .where(eq(InstagramDetails.id, user.instagramDetails));
    if (!instagramDetails?.accessToken) return null;
    const fetchReq = await fetch(
      `${getGraphUrl("me/media", instagramDetails.accessToken, [
        "thumbnail_url",
        "media_url",
        "like_count",
        "comments_count",
        "media_product_type",
        "permalink",
        "caption",
      ])}&limit=6`,
    ).then(
      (data) =>
        data.json() as Promise<{
          data?: {
            thumbnail_url: string;
            like_count: number;
            comments_count: number;
            permalink: string;
            caption: string;
            media_url: string;
            media_product_type: InstagramMediaType;
          }[];
          error?: object;
        } | null>,
    );
    if (!fetchReq?.data || fetchReq.error) return null;
    return fetchReq.data.map((media) => ({
      comments: media.comments_count,
      likes: media.like_count,
      link: media.permalink,
      thumbnail: media.thumbnail_url || media.media_url,
      type: media.media_product_type,
      caption: media.caption,
    }));
  }
}
