import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { ErrorResponses } from "../../../lib/auth/error-responses";
import {
  createUser,
  getUser,
  updateRefreshTokenAndScope,
} from "../../graphql/types/User/db/utils";
import { AuthScopes } from "../../graphql/constants/scopes";
import {
  createState,
  getState,
  getUserIdFromRefreshToken,
} from "../../../lib/auth/token";
import {
  InstagramDetails,
  UserTable,
} from "../../graphql/types/User/db/schema";
import { db } from "../../../lib/db";
import {
  getGraphUrl,
  getInstagramAuthorizationUrl,
  getLongLivedToken,
} from "./utils";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const stateParam = req.nextUrl.searchParams.get("state");
  if (stateParam) {
    const { redirectURL, refresh } = getState(stateParam);
    if (error) NextResponse.redirect(redirectURL);
    if (code) {
      const instagramData = await getLongLivedToken(code);
      if (!instagramData) return ErrorResponses.internalServerError;
      const { accessToken, userId } = instagramData;
      const loggedInUserID = getUserIdFromRefreshToken(refresh);
      const existingUser = await getUser(
        eq(UserTable.instagramDetails, userId),
      );
      let refreshToken;
      if (existingUser && loggedInUserID) {
        return NextResponse.redirect(
          `${redirectURL}?error=Can't merge account, as it's already being used`,
        );
      } else if (existingUser) {
        refreshToken = await updateRefreshTokenAndScope(
          existingUser.id,
          existingUser.refreshTokens,
          Array.from(new Set(existingUser.scopes).add(AuthScopes.INSTAGRAM)),
        );
      } else {
        const personalInfoResponse = await fetch(
          getGraphUrl(`me`, accessToken, [
            "name",
            "profile_picture_url",
            "followers_count",
            "username",
          ]),
        );
        const personalInfo = (await personalInfoResponse.json()) as {
          name: string;
          profile_picture_url?: string;
          followers_count: number;
          username: string;
        };
        if (!personalInfo.username) return ErrorResponses.internalServerError;
        await db.insert(InstagramDetails).values({
          id: userId,
          accessToken,
          username: personalInfo.username,
          followers: personalInfo.followers_count,
          picture: personalInfo.profile_picture_url,
        });
        if (loggedInUserID) {
          const loggedInUser = await getUser(eq(UserTable.id, loggedInUserID));
          if (loggedInUser) {
            refreshToken = await updateRefreshTokenAndScope(
              loggedInUser.id,
              loggedInUser.refreshTokens,
              Array.from(
                new Set(loggedInUser.scopes).add(AuthScopes.INSTAGRAM),
              ),
              {
                instagramDetails: userId,
                photo: loggedInUser.photo || personalInfo.profile_picture_url,
              },
            );
          }
        } else {
          const newUser = await createUser({
            name: personalInfo.name,
            refreshTokens: [],
            instagramDetails: userId,
            photo: personalInfo.profile_picture_url,
            scopes: [AuthScopes.INSTAGRAM],
            roles: [],
          });
          if (newUser)
            refreshToken = await updateRefreshTokenAndScope(newUser.id, []);
        }
      }
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/_auth/token?refresh=${refreshToken}&redirectURL=${redirectURL}`,
      );
    }
  }
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  const refresh = req.nextUrl.searchParams.get("refresh") || "";
  if (!redirectURL) return ErrorResponses.missingBodyFields;
  return NextResponse.redirect(
    getInstagramAuthorizationUrl(
      createState({
        redirectURL,
        refresh,
      }),
    ),
  );
};
