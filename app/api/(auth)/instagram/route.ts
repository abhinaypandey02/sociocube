import { InstagramDetails } from "@graphql/Instagram/db";
import { UserTable } from "@graphql/User/db";
import { getUser } from "@graphql/User/utils";
import { and, eq, ne } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getUserIdFromAccessToken } from "../../lib/auth/token";
import { db } from "../../lib/db";
import {
  getGraphData,
  getLongLivedToken,
  INSTAGRAM_AUTHORIZATION_URL,
} from "./utils";

const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/instagram`;

const handleError = (message: string) =>
  NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/profile?error=${message}`,
  );

export const GET = async (req: NextRequest) => {
  const accessCode = req.nextUrl.searchParams.get("code");
  if (!accessCode) return NextResponse.redirect(INSTAGRAM_AUTHORIZATION_URL);
  const error = req.nextUrl.searchParams.get("error");
  const stateToken = req.nextUrl.searchParams.get("state");
  if (error) return handleError(error);
  if (!stateToken || !accessCode) return handleError("Invalid request");
  const instagramData = await getLongLivedToken(accessCode, REDIRECT_URI);
  if (!instagramData?.accessToken)
    return handleError("Unable to reach Instagram");

  const personalInfo = (await getGraphData(`me`, instagramData.accessToken, [
    "username",
  ])) as { username: string };
  if (!personalInfo.username) return handleError("You are not logged in");

  const loggedInUserID = getUserIdFromAccessToken(stateToken);
  if (!loggedInUserID) return handleError("You are not logged in");
  const user = await getUser(eq(UserTable.id, loggedInUserID));
  if (!user?.instagramDetails)
    return handleError("Please connect instagram first");

  const [existingUnverifiedInstagram] = await db
    .update(InstagramDetails)
    .set({ isVerified: true, accessToken: instagramData.accessToken })
    .where(
      and(
        eq(InstagramDetails.id, user.instagramDetails),
        eq(InstagramDetails.username, personalInfo.username),
      ),
    )
    .returning({ username: InstagramDetails.username });

  if (!existingUnverifiedInstagram)
    return handleError(
      "Please login with the same username as the connected account",
    );

  await db
    .update(UserTable)
    .set({ instagramDetails: null })
    .where(
      and(
        ne(UserTable.id, loggedInUserID),
        eq(UserTable.instagramDetails, user.instagramDetails),
      ),
    );

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`);
};
