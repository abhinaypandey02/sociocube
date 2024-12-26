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
import { deleteImage, uploadImage } from "../../../lib/storage/aws-s3";
import {
  getInstagramDataExternalAPI,
  getInstagramAuthorizationUrl,
  getLongLivedToken,
  getGraphData,
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
      if (existingUser) {
        if (loggedInUserID && existingUser.id !== loggedInUserID) {
          return new NextResponse("This instagram account is already in use", {
            status: 400,
          });
        }
        await db
          .update(InstagramDetails)
          .set({ accessToken })
          .where(eq(InstagramDetails.appID, userId));
        refreshToken = await updateRefreshTokenAndScope(
          existingUser.id,
          existingUser.refreshTokens,
          Array.from(new Set(existingUser.scopes).add(AuthScopes.INSTAGRAM)),
        );
      } else {
        const personalInfo = (await getGraphData(`me`, accessToken, [
          "name",
          "profile_picture_url",
          "followers_count",
          "username",
          "biography",
        ])) as {
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
        const [existingUnverifiedInstagram] = await db
          .select()
          .from(InstagramDetails)
          .where(eq(InstagramDetails.username, personalInfo.username))
          .leftJoin(
            UserTable,
            eq(UserTable.instagramDetails, InstagramDetails.id),
          );
        if (existingUnverifiedInstagram) {
          if (existingUnverifiedInstagram.user) {
            const deletedImages = await db
              .delete(InstagramMediaTable)
              .where(
                eq(
                  InstagramMediaTable.user,
                  existingUnverifiedInstagram.user.id,
                ),
              )
              .returning();
            await Promise.all(
              deletedImages.map(
                (image) => image.mediaURL && deleteImage(image.mediaURL),
              ),
            );
            await db
              .update(UserTable)
              .set({
                instagramDetails: null,
                isOnboarded: false,
              })
              .where(eq(UserTable.id, existingUnverifiedInstagram.user.id));
          }
          await db
            .delete(InstagramDetails)
            .where(
              eq(
                InstagramDetails.id,
                existingUnverifiedInstagram.instagram_data.id,
              ),
            );
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
          const externalDetails = await getInstagramDataExternalAPI(
            personalInfo.username,
          );
          const instagramPhotoURL =
            externalDetails?.profile_picture_url ||
            personalInfo.profile_picture_url;
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
                    (instagramPhotoURL &&
                      (await uploadImage(instagramPhotoURL, [
                        "User",
                        loggedInUserID.toString(),
                        "photo",
                      ]))),
                  name: loggedInUser.name || personalInfo.name,
                  bio: loggedInUser.bio || personalInfo.biography,
                },
                tx,
              );
            } else tx.rollback();
          } else {
            const newUser = await createUser(
              {
                name: personalInfo.name,
                refreshTokens: [],
                instagramDetails: inserted.id,
                bio: personalInfo.biography,
                scopes: [AuthScopes.INSTAGRAM],
                roles: [],
              },
              tx,
            );
            if (newUser) {
              refreshToken = await updateRefreshTokenAndScope(
                newUser.id,
                [],
                undefined,
                {
                  photo:
                    instagramPhotoURL &&
                    (await uploadImage(instagramPhotoURL, [
                      "User",
                      newUser.id.toString(),
                      "photo",
                    ])),
                },
                tx,
              );
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
