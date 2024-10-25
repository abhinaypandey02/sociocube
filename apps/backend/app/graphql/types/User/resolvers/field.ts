import { FieldResolver, Resolver, Root } from "type-graphql";
import { eq } from "drizzle-orm";
import { UserGQL } from "../type";
import { OnboardingDataTable } from "../db/schema";
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
import { CityTable } from "../../Map/db/schema";

@Resolver(() => UserGQL)
export class UserFieldResolver {
  @FieldResolver(() => UserGQL)
  async onboardingData(@Root() user: UserDB) {
    if (!user.onboardingData) return null;
    const [data] = await db
      .select()
      .from(OnboardingDataTable)
      .where(eq(OnboardingDataTable.id, user.onboardingData));
    if (data?.city) {
      const [city] = await db
        .select()
        .from(CityTable)
        .where(eq(CityTable.id, data.city));
      if (city) {
        return {
          ...data,
          state: city.stateId,
          country: city.countryId,
        };
      }
    }
    return data;
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
        } | null>,
    );
    if (!fetchReq) return null;
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
          data: {
            thumbnail_url: string;
            like_count: number;
            comments_count: number;
            permalink: string;
            caption: string;
            media_url: string;
            media_product_type: InstagramMediaType;
          }[];
        } | null>,
    );
    if (!fetchReq) return null;
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
