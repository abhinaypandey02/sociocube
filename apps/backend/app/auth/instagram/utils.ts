export const getInstagramAuthorizationUrl = (redirectUrl: string) =>
  `https://www.facebook.com/dialog/oauth?client_id=${process.env.META_CLIENT_ID}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/_auth/instagram/oauth-redirect&state=${redirectUrl}&response_type=token&scope=instagram_basic,instagram_manage_insights,business_management`;

export const getGraphUrl = (
  path: string,
  accessToken: string,
  searchParams?: Record<string, string | string[]>,
) =>
  // @ts-expect-error string[] is valid
  `https://graph.facebook.com/${path}?access_token=${accessToken}&${searchParams && new URLSearchParams(searchParams).toString()}`;
