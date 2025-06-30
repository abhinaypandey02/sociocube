// /app/api/threads-auth/route.ts
import { NextRequest, NextResponse } from "next/server";

const FB_APP_ID = process.env.NEXT_PUBLIC_THREADS_CLIENT_ID!;
const FB_APP_SECRET = process.env.THREADS_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL + "/api/threads"; // replace with your prod URL

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  // Step 1: No code — redirect user to login
  if (!code) {
    const loginUrl = `https://threads.net/oauth/authorize?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&scope=threads_basic,threads_content_publish&response_type=code`;
    return NextResponse.redirect(loginUrl);
  }
  // Step 2: Exchange code for short-lived access token
  const tokenResponse = await fetch(
    `https://graph.threads.net/oauth/access_token?grant_type=authorization_code&client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&client_secret=${FB_APP_SECRET}&code=${code}`,
  );

  const tokenData = await tokenResponse.json();
  const shortLivedToken = tokenData.access_token;

  if (!shortLivedToken) {
    return NextResponse.json({
      error: "Failed to get short-lived token",
      data: tokenData,
    });
  }

  // Step 3: Exchange short-lived token for long-lived token
  const longTokenRes = await fetch(
    `https://graph.threads.net/access_token?grant_type=fb_exchange_token&client_secret=${FB_APP_SECRET}&access_token=${shortLivedToken}`,
  );

  const longTokenData = await longTokenRes.json();

  if (!longTokenData.access_token) {
    return NextResponse.json({
      error: "Failed to get long-lived token",
      data: longTokenData,
    });
  }

  return NextResponse.json({
    long_lived_access_token: longTokenData.access_token,
    expires_in: longTokenData.expires_in,
  });
}
