import { desc, eq } from "drizzle-orm";
import { InstagramMediaTable, UserDB, UserTable } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { InstagramDetails } from "../../../Instagram/db/schema";
import {
  getGraphUrl,
  getInstagramDataExternalAPI,
} from "../../../../../auth/instagram/utils";
import { InstagramMediaType } from "../../../../constants/instagram-media-type";
import { AuthScopes } from "../../../../constants/scopes";

function normaliseDigits(val: number) {
  return Math.round(val * 100) / 100;
}

export function getER(followers: number, likes: number, comments: number) {
  if (followers === 0 || likes === 0) return 0;
  return normaliseDigits(
    ((likes + (comments === -1 ? likes / 40 : comments) * 2) / followers) * 100,
  );
}
export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const half = Math.floor(values.length / 2);
  const newValues = [...values].sort((a, b) => b - a);
  return newValues.length % 2
    ? newValues[half] || 0
    : Math.round(((newValues[half - 1] || 0) + (newValues[half] || 0)) / 2);
}

export async function getInstagramStats(user: UserDB) {
  if (!user.instagramDetails) return null;
  const [instagramDetails] = await db
    .select()
    .from(InstagramDetails)
    .where(eq(InstagramDetails.id, user.instagramDetails));
  if (!instagramDetails) return null;
  if (
    instagramDetails.lastFetched &&
    cacheAlive(instagramDetails.lastFetched)
  ) {
    return {
      username: instagramDetails.username,
      followers: instagramDetails.followers,
      mediaCount: instagramDetails.mediaCount || 0,
      averageComments: instagramDetails.averageComments || 0,
      averageLikes: instagramDetails.averageLikes || 0,
      er: normaliseDigits(instagramDetails.er || 0),
      isVerified: Boolean(instagramDetails.accessToken),
    };
  }
  const stats = await getStats(
    user,
    instagramDetails.failedTries,
    instagramDetails.accessToken,
    instagramDetails.username,
  );
  if (stats) {
    await db
      .update(InstagramDetails)
      .set({
        followers: stats.followers_count || undefined,
        username: stats.username || undefined,
        mediaCount: stats.media_count || undefined,
        failedTries: 0,
        lastFetched: new Date(),
      })
      .where(eq(InstagramDetails.id, user.instagramDetails));
  }
  return {
    username: stats?.username || instagramDetails.username,
    followers: stats?.followers_count || instagramDetails.followers,
    mediaCount: stats?.media_count || instagramDetails.mediaCount || 0,
    averageComments: instagramDetails.averageComments || 0,
    averageLikes: instagramDetails.averageLikes || 0,
    er: normaliseDigits(instagramDetails.er || 0),
    isVerified: Boolean(instagramDetails.accessToken),
  };
}

async function getStats(
  user: UserDB,
  failedTries: number,
  accessToken?: string | null,
  username?: string,
) {
  if (accessToken) {
    const apiResult = await fetch(
      getGraphUrl("me", accessToken, [
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
    if (apiResult?.username) return apiResult;
    if (!apiResult && user.instagramDetails) {
      if (failedTries >= 5) {
        await db
          .update(UserTable)
          .set({
            scopes: user.scopes.filter(
              (scope) => scope !== AuthScopes.INSTAGRAM,
            ),
          })
          .where(eq(UserTable.id, user.id));
        await db
          .update(InstagramDetails)
          .set({ accessToken: null })
          .where(eq(InstagramDetails.id, user.instagramDetails));
      } else {
        await db
          .update(InstagramDetails)
          .set({
            failedTries: failedTries + 1,
          })
          .where(eq(InstagramDetails.id, user.instagramDetails));
      }
    }
  }
  if (username) {
    const data = await getInstagramDataExternalAPI(username);
    if (data) {
      return {
        followers_count: data.followers_count,
        media_count: data.total_media || data.total_media_public_profile,
        username: data.insta_username,
      };
    }
  }
}

export async function getPosts(accessToken?: string | null, username?: string) {
  if (accessToken) {
    const fetchReq = await fetch(
      `${getGraphUrl("me/media", accessToken, [
        "id",
        "thumbnail_url",
        "media_url",
        "like_count",
        "comments_count",
        "media_type",
        "permalink",
        "caption",
        "is_comment_enabled",
        "timestamp",
      ])}&limit=12`,
    ).then(
      (data) =>
        data.json() as Promise<{
          data?: {
            thumbnail_url: string;
            id: string;
            like_count?: number;
            comments_count: number;
            permalink: string;
            caption: string;
            media_url: string;
            is_comment_enabled: boolean;
            media_type: InstagramMediaType;
            timestamp: string;
          }[];
          error?: object;
        } | null>,
    );
    if (fetchReq?.data) return fetchReq.data;
  }
  if (username) {
    const data = await getInstagramDataExternalAPI(username);
    if (data?.media_data)
      return data.media_data
        .filter((post) => post.media_type !== InstagramMediaType.CarouselAlbum)
        .slice(0, 12);
  }
  return [];
}

function cacheAlive(d: Date) {
  const time = (new Date().getTime() - d.getTime()) / (1000 * 60 * 60);
  return time < 16;
}

export async function getInstagramMedia(user: UserDB) {
  if (!user.instagramDetails) return null;
  const [instagramDetails] = await db
    .select()
    .from(InstagramDetails)
    .where(eq(InstagramDetails.id, user.instagramDetails));
  if (!instagramDetails) return [];
  if (
    instagramDetails.lastFetched &&
    cacheAlive(instagramDetails.lastFetched)
  ) {
    const posts = await db
      .select()
      .from(InstagramMediaTable)
      .where(eq(InstagramMediaTable.user, user.id))
      .orderBy(desc(InstagramMediaTable.er))
      .limit(6);
    if (posts.length > 0) return posts;
  }
  const postsData = await getPosts(
    instagramDetails.accessToken,
    instagramDetails.username,
  );
  if (postsData.length === 0) return [];
  const posts = postsData
    .map((media) => ({
      comments: media.comments_count || -1,
      likes: media.like_count || 0,
      link: media.permalink,
      thumbnail: media.thumbnail_url || media.media_url,
      mediaURL: media.media_url,
      timestamp: media.timestamp,
      type: media.media_type,
      caption: media.caption,
      appID: media.id,
      user: user.id,
      er: getER(
        instagramDetails.followers,
        media.like_count || 0,
        media.comments_count || -1,
      ),
    }))
    .sort((a, b) => b.er - a.er);
  await db
    .delete(InstagramMediaTable)
    .where(eq(InstagramMediaTable.user, user.id));
  await db.insert(InstagramMediaTable).values(posts).onConflictDoNothing();
  await db
    .update(InstagramDetails)
    .set({
      averageLikes: median(posts.map((post) => post.likes).filter(Boolean)),
      averageComments: median(
        posts.map((post) => post.comments).filter(Boolean),
      ),
      er: median(posts.map((post) => post.er).filter(Boolean)),
      lastFetched: new Date(),
    })
    .where(eq(InstagramDetails.id, user.instagramDetails));
  return posts.slice(0, 6);
}
