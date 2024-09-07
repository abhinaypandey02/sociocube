import { google } from "googleapis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {
  createUser,
  getUser,
  updateRefreshTokenAndScope,
} from "../../graphql/types/User/db/utils";
import { AuthScopes } from "../../graphql/constants/scopes";
import { getUserIdFromRefreshToken } from "../../../lib/auth/token";
import { UserTable } from "../../graphql/types/User/db/schema";
import { oauth2Client } from "./google-oauth";

function errorResponse(redirectURL: string | null) {
  return NextResponse.redirect(
    redirectURL || process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "",
  );
}
export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const state = req.nextUrl.searchParams.get("state") || undefined;
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  const refresh = req.cookies.get("refresh")?.value;

  if (!code && !error) {
    const authorizationUrl = oauth2Client.generateAuthUrl({
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      state,
      include_granted_scopes: true,
      prompt: "consent",
      redirect_uri: redirectURL || undefined,
    });
    return NextResponse.redirect(authorizationUrl);
  } else if (error) {
    return errorResponse(redirectURL);
  } else if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userInfoRequest = await google
      .oauth2({
        auth: oauth2Client,
        version: "v2",
      })
      .userinfo.get();

    const user = userInfoRequest.data;
    if (user.email) {
      const loggedInUserID = getUserIdFromRefreshToken(refresh);
      const existingUser = await getUser(eq(UserTable.email, user.email));
      let refreshToken;
      if (existingUser && loggedInUserID) {
        return NextResponse.redirect(
          `${redirectURL}?error=Can't merge account, as it's already being used`,
        );
      } else if (existingUser) {
        refreshToken = await updateRefreshTokenAndScope(
          existingUser.id,
          existingUser.refreshTokens,
            Array.from(new Set(existingUser.scopes).add(AuthScopes.GOOGLE)),
        );
      } else if (loggedInUserID) {
        const loggedInUser = await getUser(eq(UserTable.id, loggedInUserID));
        if (loggedInUser) {
          refreshToken = await updateRefreshTokenAndScope(
            loggedInUser.id,
            loggedInUser.refreshTokens,
            Array.from(new Set(loggedInUser.scopes).add(AuthScopes.GOOGLE)),
          );
        }
      } else if (user.name) {
        const newUser = await createUser({
          email: user.email,
          name: user.name,
          refreshTokens: [],
          scopes: [AuthScopes.GOOGLE],
          roles: [],
        });
        if (newUser) {
          refreshToken = await updateRefreshTokenAndScope(newUser.id, []);
        }
      }
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/token?refresh=${refreshToken}&redirectURL=${redirectURL}&state=${state}`,
      );
    }
  }
  return errorResponse(redirectURL);
};
