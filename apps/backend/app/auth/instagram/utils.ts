import { InstagramMediaType } from "../../graphql/constants/instagram-media-type";

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
