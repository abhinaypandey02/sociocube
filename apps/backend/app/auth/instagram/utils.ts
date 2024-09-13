const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/instagram`;
export const getInstagramAuthorizationUrl = (state: string) =>
  `https://www.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&state=${state}&response_type=code&enable_fb_login=0&force_authentication=1&scope=business_basic&redirect_uri=${REDIRECT_URI}`;

export const getGraphUrl = (
  path: string,
  accessToken: string,
  fields?: string[],
) =>
  `https://graph.instagram.com/v20.0/${path}?access_token=${accessToken}&fields=${fields?.join(",")}`;

export async function getLongLivedToken(code: string) {
  const formData = new FormData();
  formData.set("client_id", process.env.INSTAGRAM_CLIENT_ID || "");
  formData.set("client_secret", process.env.INSTAGRAM_CLIENT_SECRET || "");
  formData.set("grant_type", "authorization_code");
  formData.set("redirect_uri", REDIRECT_URI);
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
