import { google } from "googleapis";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { v4 } from "uuid";
import {
  createUser,
  getUser,
  updateRefreshTokenAndScope,
} from "@graphql/types/User/db/utils";
import { UserTable } from "@graphql/types/User/db/schema";
import { getRoute } from "../../../../constants/routes";
import { oauth2Client } from "./google-oauth";

function errorResponse(redirectURL: string | null) {
  return NextResponse.redirect(
    redirectURL || process.env.NEXT_PUBLIC_BASE_URL || "",
  );
}
export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (!code && !error) {
    const state = v4();
    const authorizationUrl = oauth2Client.generateAuthUrl({
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      state,
      include_granted_scopes: true,
      prompt: "consent",
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`,
    });
    const res = NextResponse.redirect(authorizationUrl);
    res.cookies.set("state", state, {
      httpOnly: true,
      secure: true,
    });
    return res;
  }
  if (error) {
    return errorResponse(getRoute("SignUp"));
  }
  const state = req.nextUrl.searchParams.get("state") || undefined;
  if (code && state) {
    const localState = req.cookies.get("state")?.value;
    if (localState !== state) return errorResponse(getRoute("SignUp"));
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
      const existingUser = await getUser(eq(UserTable.email, user.email));
      let refreshToken;
      if (existingUser) {
        refreshToken = await updateRefreshTokenAndScope(
          existingUser.id,
          existingUser.refreshTokens,
          { emailVerified: true },
        );
      } else if (user.name) {
        const newUser = await createUser({
          email: user.email,
          name: user.name,
          refreshTokens: [],
          emailVerified: true,
        });
        if (newUser) {
          refreshToken = await updateRefreshTokenAndScope(newUser.id, []);
        }
      }

      const res = NextResponse.redirect(getRoute("Home"));
      if (refreshToken)
        res.cookies.set("refresh", refreshToken, {
          httpOnly: true,
          secure: true,
        });
      res.cookies.set("state", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
      });
      return res;
    }
  }
  return errorResponse(getRoute("SignUp"));
};
