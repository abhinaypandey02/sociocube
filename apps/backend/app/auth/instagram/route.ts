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
  BASE_REDIRECT_URI,
  createState,
  getState,
  getUserIdFromRefreshToken,
} from "../../../lib/auth/token";
import { UserTable } from "../../graphql/types/User/db/schema";
import { db } from "../../../lib/db";
import { InstagramDetails } from "../../graphql/types/Instagram/db/schema";
import {
  getGraphUrl,
  getInstagramAuthorizationUrl,
  getLongLivedToken,
} from "./utils";

export const GET = async (req: NextRequest) => {
  const accessCode = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const stateParam = req.nextUrl.searchParams.get("state");
  if (stateParam) {
    const { refresh, csrfToken } = getState(stateParam);
    if (error) NextResponse.redirect(BASE_REDIRECT_URI);
    if (accessCode) {
      const instagramData = await getLongLivedToken(accessCode);
      if (!instagramData) return ErrorResponses.internalServerError;
      const { accessToken, userId } = instagramData;
      const loggedInUserID = getUserIdFromRefreshToken(refresh);
      const existingUser = await getUser(
        eq(UserTable.instagramDetails, userId),
      );
      let refreshToken;
      if (existingUser && loggedInUserID) {
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=Can't merge account, as it's already being used`,
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
            "biography",
          ]),
        );
        const personalInfo = (await personalInfoResponse.json()) as {
          name: string;
          profile_picture_url?: string;
          followers_count: number;
          username: string;
          biography?: string;
        };
        if (!personalInfo.username) return ErrorResponses.internalServerError;
        await db.insert(InstagramDetails).values({
          id: userId,
          accessToken,
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
                name: loggedInUser.name || personalInfo.name,
                bio: loggedInUser.bio || personalInfo.biography,
              },
            );
          }
        } else {
          const newUser = await createUser({
            name: personalInfo.name,
            refreshTokens: [],
            instagramDetails: userId,
            photo: personalInfo.profile_picture_url,
            bio: personalInfo.biography,
            scopes: [AuthScopes.INSTAGRAM],
            roles: [],
          });
          if (newUser)
            refreshToken = await updateRefreshTokenAndScope(newUser.id, []);
        }
      }
      return NextResponse.redirect(
        `${BASE_REDIRECT_URI}?refresh=${refreshToken}&csrf_token=${csrfToken}`,
      );
    }
  }
  const refresh = req.nextUrl.searchParams.get("refresh") || "";
  const csrfToken = req.nextUrl.searchParams.get("csrf_token") || "";
  if (!csrfToken) return ErrorResponses.missingBodyFields;
  return NextResponse.redirect(
    getInstagramAuthorizationUrl(
      createState({
        csrfToken,
        refresh,
      }),
    ),
  );
};
