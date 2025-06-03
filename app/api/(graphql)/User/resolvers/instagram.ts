import { db } from "@backend/lib/db";
import { deleteImage } from "@backend/lib/storage/aws-s3";
import { normaliseDigits } from "@backend/lib/utils/math";
import { desc, eq } from "drizzle-orm";

import type { Context } from "@/app/api/lib/auth/context";

import { InstagramDetails } from "../../Instagram/db";
import { InstagramMediaTable } from "../../Instagram/db2";
import { deleteOldPosts } from "../../Instagram/fetch-utils";
import { fetchStats, fetchUploadedPostsAndStats } from "../../Instagram/utils";
import { SubscriptionTable } from "../../Subscription/db";
import type { UserDB } from "../db";

function cacheAlive(d: Date) {
  const time = (new Date().getTime() - d.getTime()) / (1000 * 60 * 60);
  return time < 36;
}

export async function getInstagramStats(ctx: Context, user: UserDB) {
  if (!ctx.userId) return null;
  if (!user.instagramDetails) return null;

  const [instagramDetails] = await db
    .select()
    .from(InstagramDetails)
    .where(eq(InstagramDetails.id, user.instagramDetails));
  if (!instagramDetails) return null;

  if (ctx.userId !== user.id) {
    const [subscription] = await db
      .select()
      .from(SubscriptionTable)
      .where(eq(SubscriptionTable.user, ctx.userId));
    if (!subscription) {
      return {
        username: instagramDetails.username,
        followers: instagramDetails.followers,
        mediaCount: -2,
        averageComments: -2,
        averageLikes: -2,
        er: -2,
        isVerified: instagramDetails.isVerified,
      };
    }
  }

  if (
    instagramDetails.lastFetchedInstagramStats &&
    cacheAlive(instagramDetails.lastFetchedInstagramStats)
  ) {
    return {
      username: instagramDetails.username,
      followers: instagramDetails.followers,
      mediaCount: instagramDetails.mediaCount || 0,
      averageComments: instagramDetails.averageComments || 0,
      averageLikes: instagramDetails.averageLikes || 0,
      er: normaliseDigits(instagramDetails.er || 0),
      isVerified: instagramDetails.isVerified,
    };
  }
  const stats = await fetchStats(
    user,
    instagramDetails.failedTries,
    instagramDetails.accessToken,
    instagramDetails.username,
  );
  if (stats) {
    await db
      .update(InstagramDetails)
      .set({
        ...stats,
        failedTries: 0,
        lastFetchedInstagramStats: new Date(),
      })
      .where(eq(InstagramDetails.id, user.instagramDetails));
  }
  return {
    username: stats?.username || instagramDetails.username,
    followers: stats?.followers || instagramDetails.followers,
    mediaCount: stats?.mediaCount || instagramDetails.mediaCount || 0,
    averageComments: instagramDetails.averageComments || 0,
    averageLikes: instagramDetails.averageLikes || 0,
    er: normaliseDigits(instagramDetails.er || 0),
    isVerified: instagramDetails.isVerified,
  };
}

export async function getInstagramMedia(user: UserDB) {
  if (!user.instagramDetails) return [];
  const [instagramDetails] = await db
    .select()
    .from(InstagramDetails)
    .where(eq(InstagramDetails.id, user.instagramDetails));
  if (!instagramDetails) return [];
  if (
    instagramDetails.lastFetchedInstagramMedia &&
    cacheAlive(instagramDetails.lastFetchedInstagramMedia)
  ) {
    const posts = await db
      .select()
      .from(InstagramMediaTable)
      .where(eq(InstagramMediaTable.user, user.id))
      .orderBy(desc(InstagramMediaTable.er))
      .limit(4);
    if (posts.length > 0) return posts;
  }
  const { posts, stats } = await fetchUploadedPostsAndStats(
    instagramDetails.followers,
    user.id,
    instagramDetails.accessToken,
    instagramDetails.username,
  );
  if (!posts || !stats || posts.length === 0) return [];
  const deleted = await deleteOldPosts(user.id, posts);
  await db.insert(InstagramMediaTable).values(posts).onConflictDoNothing();
  await Promise.all(
    deleted.map(({ url }) => url !== posts[0]?.thumbnail && deleteImage(url)),
  );
  await db
    .update(InstagramDetails)
    .set(stats)
    .where(eq(InstagramDetails.id, user.instagramDetails));
  return posts;
}
