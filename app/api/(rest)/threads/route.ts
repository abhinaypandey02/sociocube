// /app/api/threads-auth/route.ts
import { THREADS_ACCESS_TOKEN } from "@backend/(rest)/threads/constants";
import { db } from "@backend/lib/db";
import { ConfigTable } from "@graphql/Config/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const FB_APP_ID = process.env.NEXT_PUBLIC_THREADS_CLIENT_ID!;
const FB_APP_SECRET = process.env.THREADS_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_BASE_URL + "/api/threads"; // replace with your prod URL

export async function GET(req: NextRequest) {
  const force = req.nextUrl.searchParams.get("force");

  const [token] = await db
    .select()
    .from(ConfigTable)
    .where(eq(ConfigTable.key, THREADS_ACCESS_TOKEN));

  if (token && !force) {
    if (
      (new Date().getTime() - token.updatedAt.getTime()) / (1000 * 3600 * 24) >
      2
    ) {
      const longTokenRes = await fetch(
        `https://graph.threads.net/refresh_access_token?grant_type=th_refresh_token&access_token=${token}`,
      );
      const longTokenData = await longTokenRes.json();
      if (!longTokenData.access_token) {
        return new NextResponse("Failed to refresh long-lived token");
      }
      await db
        .update(ConfigTable)
        .set({ value: longTokenData.access_token, updatedAt: new Date() })
        .where(eq(ConfigTable.key, THREADS_ACCESS_TOKEN));
      return new NextResponse("Updated");
    } else {
      return new NextResponse("Fresh as new");
    }
  }

  const code = req.nextUrl.searchParams.get("code");
  // Step 1: No code — redirect user to login
  if (!code) {
    const loginUrl = `https://threads.net/oauth/authorize?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI,
    )}&scope=threads_basic,threads_content_publish,threads_manage_replies&response_type=code`;
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
    return new NextResponse("Failed to get short-lived token");
  }

  // Step 3: Exchange short-lived token for long-lived token
  const longTokenRes = await fetch(
    `https://graph.threads.net/access_token?grant_type=th_exchange_token&client_secret=${FB_APP_SECRET}&access_token=${shortLivedToken}`,
  );

  const longTokenData = await longTokenRes.json();

  if (!longTokenData.access_token) {
    return new NextResponse("Failed to get long-lived token");
  }
  await db
    .insert(ConfigTable)
    .values({ key: THREADS_ACCESS_TOKEN, value: longTokenData.access_token });
  return new NextResponse("Long lived token is set");
}
