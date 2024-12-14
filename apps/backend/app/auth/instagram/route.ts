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
  getHDProfilePicture,
  getInstagramAuthorizationUrl,
  getLongLivedToken,
} from "./utils";

export const GET = async (req: NextRequest) => {
  const accessCode = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const stateParam = req.nextUrl.searchParams.get("state");
  if (error) NextResponse.redirect(BASE_REDIRECT_URI);
  if (stateParam) {
    const { refresh, csrfToken } = getState(stateParam);
    if (!csrfToken)
      return new NextResponse("Refresh or csrftoken not found", {
        status: 400,
      });
    if (accessCode) {
      const instagramData = await getLongLivedToken(accessCode);
      if (!instagramData)
        return new NextResponse(
          "Can't exchange access code with instagram api",
          {
            status: 400,
          },
        );
      const { accessToken, userId } = instagramData;

      if (!accessToken || !userId)
        return new NextResponse(
          "Can't fetch accessToken or userId from instagram api",
          {
            status: 400,
          },
        );
      console.warn("refresh", refresh);
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
      console.warn("existingUser", existingUser, loggedInUserID);

      let refreshToken;
      if (existingUser && loggedInUserID) {
        await db
          .update(InstagramDetails)
          .set({ accessToken })
          .where(eq(InstagramDetails.appID, userId));
        refreshToken = await updateRefreshTokenAndScope(
          existingUser.id,
          existingUser.refreshTokens,
          Array.from(new Set(existingUser.scopes).add(AuthScopes.INSTAGRAM)),
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
        if (!personalInfo.username)
          return new NextResponse("Can't fetch username for the current user", {
            status: 400,
          });
        const [spirit] = await db
          .select()
          .from(InstagramDetails)
          .where(eq(InstagramDetails.username, personalInfo.username))
          .leftJoin(
            UserTable,
            eq(UserTable.instagramDetails, InstagramDetails.id),
          );
        if (spirit) {
          if (spirit.user) {
            await db
              .delete(InstagramMediaTable)
              .where(eq(InstagramMediaTable.user, spirit.user.id));
            await db.delete(UserTable).where(eq(UserTable.id, spirit.user.id));
          }
          await db
            .delete(InstagramDetails)
            .where(eq(InstagramDetails.id, spirit.instagram_data.id));
        }
        const id = await db.transaction(async (tx) => {
          const [inserted] = await tx
            .insert(InstagramDetails)
            .values({
              appID: userId,
              username: personalInfo.username,
              followers: personalInfo.followers_count,
              accessToken,
            })
            .returning();
          if (!inserted) return tx.rollback();
          const hdPhoto = await getHDProfilePicture(personalInfo.username);

          if (loggedInUserID) {
            const loggedInUser = await getUser(
              eq(UserTable.id, loggedInUserID),
            );
            if (loggedInUser) {
              refreshToken = await updateRefreshTokenAndScope(
                loggedInUser.id,
                loggedInUser.refreshTokens,
                Array.from(
                  new Set(loggedInUser.scopes).add(AuthScopes.INSTAGRAM),
                ),
                {
                  instagramDetails: inserted.id,
                  photo:
                    loggedInUser.photo ||
                    hdPhoto ||
                    personalInfo.profile_picture_url,
                  name: loggedInUser.name || personalInfo.name,
                  bio: loggedInUser.bio || personalInfo.biography,
                },
              );
            } else tx.rollback();
          } else {
            const newUser = await createUser({
              name: personalInfo.name,
              refreshTokens: [],
              instagramDetails: inserted.id,
              photo: hdPhoto || personalInfo.profile_picture_url,
              bio: personalInfo.biography,
              scopes: [AuthScopes.INSTAGRAM],
              roles: [],
            });
            if (newUser) {
              refreshToken = await updateRefreshTokenAndScope(newUser.id, []);
            } else tx.rollback();
          }
          return inserted.id;
        });
        if (!id)
          return new NextResponse("Error creating new user", {
            status: 400,
          });
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
