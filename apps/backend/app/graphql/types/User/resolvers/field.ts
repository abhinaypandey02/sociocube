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
      const [city] = await db
        .select()
        .from(CityTable)
        .where(eq(CityTable.id, data.city));
      if (city) {
        onboardingData.state = city.stateId;
        onboardingData.country = city.countryId;
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

  @FieldResolver(() => InstagramStats, { nullable: true })
  async instagramStats(@Root() user: UserDB): Promise<InstagramStats | null> {
    if (!user.instagramDetails) return null;
    const [instagramDetails] = await db
      .select()
      .from(InstagramDetails)
      .where(eq(InstagramDetails.id, user.instagramDetails));
    if (!instagramDetails) return null;
    const fetchReq = await fetch(
      getGraphUrl("me", instagramDetails.accessToken, [
        "followers_count",
        "media_count",
        "username",
      ]),
    ).then(
      (data) =>
        data.json() as Promise<{
          followers_count: number;
          media_count: number;
          username: string;
          error?: object;
        } | null>,
    );
    if (!fetchReq || fetchReq.error) return null;
    await db
      .update(InstagramDetails)
      .set({
        followers: fetchReq.followers_count || 0,
        username: fetchReq.username || null,
      })
      .where(eq(InstagramDetails.id, user.instagramDetails));
    return {
      username: fetchReq.username,
      followers: fetchReq.followers_count,
      mediaCount: fetchReq.media_count,
    };
  }
  @FieldResolver(() => [InstagramMedia], { nullable: true })
  async instagramMedia(@Root() user: UserDB): Promise<InstagramMedia[] | null> {
    if (!user.instagramDetails) return null;
    const [instagramDetails] = await db
      .select()
      .from(InstagramDetails)
      .where(eq(InstagramDetails.id, user.instagramDetails));
    if (!instagramDetails) return null;
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
