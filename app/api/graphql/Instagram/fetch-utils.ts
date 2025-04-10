import { getGraphUrl } from "@backend/(auth)/instagram/utils";
import { InstagramMediaType } from "@backend/lib/constants/instagram-media-type";
import { getER } from "@backend/lib/utils/math";
import { and, eq } from "drizzle-orm";
import { notInArray } from "drizzle-orm/sql/expressions/conditions";

import { db } from "../../lib/db";
import { instagramRapidAPI } from "../../lib/rapidapi/instagram";
import { InstagramDetails } from "./db";
import { InstagramMediaTable } from "./db2";

export interface FetchedInstagramPost {
  isVideo: boolean;
  comments: number;
  likes: number;
  link: string;
  mediaURL: string | undefined;
  timestamp: string;
  thumbnail: string | undefined;
  caption: string;
  appID: string;
  user: number;
  er: number;
}
export interface SafeFetchedInstagramPost
  extends Omit<FetchedInstagramPost, "thumbnail"> {
  thumbnail: string;
}

export async function fetchInstagramGraphStats(accessToken: string) {
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
  if (apiResult?.username)
    return {
      followers: apiResult.followers_count,
      mediaCount: apiResult.media_count,
      username: apiResult.username,
    };
}
export async function fetchInstagramGraphMedia(
  accessToken: string,
  followers: number,
  user: number,
): Promise<FetchedInstagramPost[] | undefined> {
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
          thumbnail_url?: string;
          id: string;
          like_count?: number;
          comments_count: number;
          permalink: string;
          caption: string;
          media_url?: string;
          is_comment_enabled?: boolean;
          media_type?: InstagramMediaType;
          isVideo?: boolean;
          timestamp: string;
        }[];
        error?: object;
      } | null>,
  );
  if (fetchReq?.data)
    return fetchReq.data.map((media) => ({
      isVideo: media.media_type === InstagramMediaType.Video,
      comments: media.comments_count || -1,
      likes: media.like_count || 0,
      link: media.permalink,
      thumbnail: media.thumbnail_url || media.media_url,
      mediaURL: media.media_url,
      timestamp: media.timestamp,
      caption: media.caption,
      appID: media.id,
      user,
      er: getER(followers, media.like_count || 0, media.comments_count || -1),
    }));
}

export async function fetchInstagramRapidStats(username: string) {
  const result = (await instagramRapidAPI(
    `info?username_or_id_or_url=${username}`,
  ).catch(() => ({}))) as {
    data?: {
      profile_pic_url_hd?: string;
      username: string;
      biography: string;
      full_name: string;
      follower_count: number;
      media_count: number;
    };
  };
  if (result.data)
    return {
      followers: result.data.follower_count,
      mediaCount: result.data.media_count,
      username: result.data.username,
      photo: result.data.profile_pic_url_hd,
      bio: result.data.biography,
    };
}

export async function fetchInstagramRapidMedia(
  username: string,
  followers: number,
  user: number,
): Promise<FetchedInstagramPost[] | undefined> {
  const result = (await instagramRapidAPI(
    `reels?username_or_id_or_url=${username}&url_embed_safe=true`,
  ).catch(() => ({}))) as {
    data?: {
      user?: {
        username: string;
      };
      items: {
        comment_count: number;
        like_count: number;
        video_url?: string;
        code: string;
        thumbnail_url: string;
        is_video: boolean;
        can_reply: boolean;
        like_and_view_counts_disabled: boolean;
        taken_at: number;
        id: string;
        caption?: {
          text?: string;
        };
      }[];
    };
  };
  if (result.data?.user?.username && result.data.user.username !== username) {
    await db
      .update(InstagramDetails)
      .set({
        username: result.data.user.username,
      })
      .where(eq(InstagramDetails.username, username));
  }
  return result.data?.items.map((item) => ({
    isVideo: item.is_video,
    comments: item.comment_count,
    likes: item.like_and_view_counts_disabled ? -1 : item.like_count,
    link: `https://www.instagram.com/p/${item.code}`,
    thumbnail: item.thumbnail_url,
    mediaURL: item.video_url,
    timestamp: new Date(item.taken_at * 1000).toISOString(),
    caption: item.caption?.text || "",
    appID: item.id,
    user,
    er: getER(
      followers,
      item.like_count || 0,
      item.can_reply ? item.comment_count : -1,
    ),
  }));
}

async function fetchInstagramClanConnect(username: string) {
  const result = (await fetch(
    `https://smapi.clanconnect.ai/instagram/public_profile?instagram_handle_name=${
      username
    }`,
    {
      headers: {
        Authorization: "HellowncdgudEkjncinUnjnjcOnc83hnU",
      },
    },
  )
    .then((res) => res.json())
    .catch(() => ({}))) as {
    data?: {
      profile_picture_url?: string;
      logging_page_id: number;
      instagram_id: string;
      insta_username: string;
      biography: string;
      name: string;
      followers_count: number;
      follows: number;
      total_media: number;
      total_likes: number;
      total_comments: number;
      median_likes: number;
      median_comments: number;
      total_media_public_profile: number;
      total_video_counts_public_profile: number;
      er: string;
      media_data: {
        caption: string;
        comments_count: number;
        like_count: number;
        media_product_type: string;
        media_type: InstagramMediaType;
        media_url: string;
        permalink: string;
        thumbnail_url: string;
        timestamp: string;
        id: string;
      }[];
    };
  };
  return result.data;
}

export async function fetchInstagramClanConnectStats(username: string) {
  const result = await fetchInstagramClanConnect(username);
  if (result)
    return {
      followers: result.followers_count,
      mediaCount: result.total_media,
      username: result.insta_username,
      photo: result.profile_picture_url,
      bio: result.biography,
    };
}

export async function fetchInstagramClanConnectMedia(
  username: string,
  followers: number,
  user: number,
): Promise<FetchedInstagramPost[] | undefined> {
  const result = await fetchInstagramClanConnect(username);
  if (result?.media_data)
    return result.media_data.map((media) => ({
      isVideo: media.media_type === InstagramMediaType.Video,
      comments: media.comments_count,
      likes: media.like_count || 0,
      link: media.permalink,
      thumbnail: media.thumbnail_url,
      mediaURL: media.media_url,
      timestamp: media.timestamp,
      caption: media.caption,
      appID: media.id,
      user,
      er: getER(followers, media.like_count || 0, media.comments_count || -1),
    }));
}

export async function deleteOldPosts(
  id: number,
  posts: SafeFetchedInstagramPost[],
) {
  return db
    .delete(InstagramMediaTable)
    .where(
      and(
        eq(InstagramMediaTable.user, id),
        notInArray(
          InstagramMediaTable.thumbnail,
          posts.map((post) => post.thumbnail).slice(1),
        ),
      ),
    )
    .returning({
      url: InstagramMediaTable.thumbnail,
    });
}
