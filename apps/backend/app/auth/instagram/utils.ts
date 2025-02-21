import { instagramRapidAPI } from "../../../lib/rapidapi/instagram";

export const getInstagramAuthorizationUrl = (
  state: string,
  redirectURL: string,
) =>
  `https://www.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&state=${state}&response_type=code&enable_fb_login=0&force_authentication=1&scope=instagram_business_basic&redirect_uri=${redirectURL}`;

export const getGraphUrl = (
  path: string,
  accessToken: string,
  fields?: string[],
) =>
  `https://graph.instagram.com/v20.0/${path}?access_token=${accessToken}&fields=${fields?.join(",")}`;

export const getGraphData = async (
  path: string,
  accessToken: string,
  fields?: string[],
) => {
  const personalInfoResponse = await fetch(
    getGraphUrl(path, accessToken, fields),
  );
  return personalInfoResponse.json();
};

export async function getRefreshedAccessToken(token: string) {
  const request = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
  );
  const response = (await request.json()) as { access_token?: string };
  return response.access_token;
}

export async function getLongLivedToken(code: string, redirectURL: string) {
  const formData = new FormData();
  formData.set("client_id", process.env.INSTAGRAM_CLIENT_ID || "");
  formData.set("client_secret", process.env.INSTAGRAM_CLIENT_SECRET || "");
  formData.set("grant_type", "authorization_code");
  formData.set("redirect_uri", redirectURL);
  formData.set("code", code);
  const shortRes = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    body: formData,
  });
  if (shortRes.ok) {
    const shortResData = (await shortRes.json()) as {
      access_token: string;
      user_id: string;
      permissions: string[];
    };
    if (shortResData.access_token) {
      const shortLivedToken = shortResData.access_token;
      const longRes = await fetch(
        `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&access_token=${shortLivedToken}&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}`,
      );
      if (longRes.ok) {
        const longResData = (await longRes.json()) as {
          access_token: string;
          token_type: "bearer";
          expires_in: number;
        };
        return {
          accessToken: longResData.access_token,
          userId: shortResData.user_id,
        };
      }
    }
  }
}

export async function getInstagramDataExternalAPI(username: string) {
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
  return result.data;
}

export async function getInstagramMediaExternalAPI(username: string) {
  const result = (await instagramRapidAPI(
    `posts?username_or_id_or_url=${username}&url_embed_safe=true`,
  ).catch(() => ({}))) as {
    data?: {
      items: {
        comment_count: number;
        like_count: number;
        video_url?: string;
        code: string;
        thumbnail_url: string;
        is_video: boolean;
        can_reply: boolean;
        taken_at: number;
        id: string;
        caption: {
          text?: string;
        };
      }[];
    };
  };
  const x = result.data?.items.map((item) => ({
    id: item.id,
    thumbnail_url: item.thumbnail_url,
    like_count: item.like_count,
    comments_count: item.comment_count,
    permalink: `https://www.instagram.com/p/${item.code}`,
    caption: item.caption.text || "",
    media_url: item.video_url,
    is_comment_enabled: item.can_reply,
    timestamp: new Date(item.taken_at * 1000).toISOString(),
    isVideo: item.is_video,
  }));
  return x;
}
