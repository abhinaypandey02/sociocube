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
import {
  InstagramMediaTable,
  UserTable,
} from "../../graphql/types/User/db/schema";
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
      const [existingUserJoin] = await db
        .select()
        .from(InstagramDetails)
        .where(eq(InstagramDetails.appID, userId))
        .innerJoin(
          UserTable,
          eq(UserTable.instagramDetails, InstagramDetails.id),
        );
      const existingUser = existingUserJoin?.user;
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
        const [spirit] = await db
          .select()
          .from(InstagramDetails)
          .where(eq(InstagramDetails.username, personalInfo.username))
          .innerJoin(
            UserTable,
            eq(UserTable.instagramDetails, InstagramDetails.id),
          );
        if (spirit) {
          await db
            .delete(InstagramMediaTable)
            .where(eq(InstagramMediaTable.user, spirit.user.id));
          await db.delete(UserTable).where(eq(UserTable.id, spirit.user.id));
          await db
            .delete(InstagramDetails)
            .where(eq(InstagramDetails.id, spirit.instagram_data.id));
        }
        const [inserted] = await db
          .insert(InstagramDetails)
          .values({
            appID: userId,
            username: personalInfo.username,
            followers: personalInfo.followers_count,
            accessToken,
          })
          .returning();
        if (!inserted) return ErrorResponses.internalServerError;
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
                instagramDetails: inserted.id,
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
            instagramDetails: inserted.id,
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
