import { desc, eq } from "drizzle-orm";
import { InstagramMediaTable, UserDB, UserTable } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { InstagramDetails } from "../../../Instagram/db/schema";
import { getGraphUrl } from "../../../../../auth/instagram/utils";
import { InstagramMediaType } from "../../../../constants/instagram-media-type";

function normaliseDigits(val: number) {
  return Math.round(val * 100) / 100;
}

function getER(followers: number, likes: number, comments: number) {
  if (followers === 0 || likes === 0) return 0;
  return normaliseDigits(
    ((likes + (comments === -1 ? likes / 40 : comments) * 2) / followers) * 100,
  );
}
function median(values: number[]): number {
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
  if (instagramDetails.accessToken) {
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
    if (fetchReq && !fetchReq.error) {
      const [fallback] = await db
        .update(InstagramDetails)
        .set({
          followers: fetchReq.followers_count || undefined,
          username: fetchReq.username || undefined,
          mediaCount: fetchReq.media_count || undefined,
          failedTries: 0,
        })
        .where(eq(InstagramDetails.id, user.instagramDetails))
        .returning();

      const returnedUsername = fetchReq.username || fallback?.username;
      if (!returnedUsername) return null;
      return {
        username: returnedUsername,
        followers: fetchReq.followers_count || fallback?.followers || 0,
        mediaCount: fetchReq.media_count || 0,
        averageComments: instagramDetails.averageComments || 0,
        averageLikes: instagramDetails.averageLikes || 0,
        er: normaliseDigits(instagramDetails.er || 0),
      };
    }
    if (instagramDetails.failedTries >= 2) {
      await db
        .update(UserTable)
        .set({ isOnboarded: false })
        .where(eq(UserTable.id, user.id));
      await db
        .update(InstagramDetails)
        .set({ failedTries: 0 })
        .where(eq(InstagramDetails.id, user.instagramDetails));
    }
    await db
      .update(InstagramDetails)
      .set({
        failedTries: (instagramDetails.failedTries || 0) + 1,
      })
      .where(eq(InstagramDetails.id, user.instagramDetails));
  }
  return {
    username: instagramDetails.username,
    followers: instagramDetails.followers,
    mediaCount: instagramDetails.mediaCount,
    averageComments: instagramDetails.averageComments || 0,
    averageLikes: instagramDetails.averageLikes || 0,
    er: normaliseDigits(instagramDetails.er || 0),
  };
}

export async function getInstagramMedia(user: UserDB) {
  if (!user.instagramDetails) return null;
  const [instagramDetails] = await db
    .select()
    .from(InstagramDetails)
    .where(eq(InstagramDetails.id, user.instagramDetails));
  if (instagramDetails?.accessToken) {
    const fetchReq = await fetch(
      `${getGraphUrl("me/media", instagramDetails.accessToken, [
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

    if (fetchReq?.data) {
      const posts = fetchReq.data
        .map((media) => ({
          comments: media.is_comment_enabled ? media.comments_count : -1,
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
            media.is_comment_enabled ? media.comments_count : -1,
          ),
        }))
        .sort((a, b) => b.er - a.er);
      if (posts.length) {
        await db
          .delete(InstagramMediaTable)
          .where(eq(InstagramMediaTable.user, user.id));
        await db.insert(InstagramMediaTable).values(posts);
        await db
          .update(InstagramDetails)
          .set({
            averageLikes: median(
              posts.map((post) => post.likes).filter(Boolean),
            ),
            averageComments: median(
              posts.map((post) => post.comments).filter(Boolean),
            ),
            er: median(posts.map((post) => post.er).filter(Boolean)),
          })
          .where(eq(InstagramDetails.id, user.instagramDetails));
      }
      return posts.slice(0, 6);
    }
  }
  if (user.isSpirit) {
    return db
      .select()
      .from(InstagramMediaTable)
      .where(eq(InstagramMediaTable.user, user.id))
      .limit(6)
      .orderBy(desc(InstagramMediaTable.er));
  }
  return [];
}
