import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {
  getUser,
  updateRefreshTokenAndScope,
} from "../../graphql/types/User/db/utils";
import {
  BASE_REDIRECT_URI,
  createState,
  getState,
  getUserIdFromRefreshToken,
} from "../../../lib/auth/token";
import { UserTable } from "../../graphql/types/User/db/schema";
import { db } from "../../../lib/db";
import { InstagramDetails } from "../../graphql/types/Instagram/db/schema";
import { uploadImage } from "../../../lib/storage/aws-s3";
import { getPosts } from "../../graphql/types/User/resolvers/field/instagram";
import { InstagramMediaTable } from "../../graphql/types/Instagram/db/schema2";
import { AgencyTable } from "../../graphql/types/Agency/db/schema";
import {
  getGraphData,
  getInstagramAuthorizationUrl,
  getInstagramDataExternalAPI,
  getLongLivedToken,
} from "./utils";

const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/instagram`;

export const GET = async (req: NextRequest) => {
  const accessCode = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");
  const stateParam = req.nextUrl.searchParams.get("state");
  if (error) NextResponse.redirect(BASE_REDIRECT_URI);
  if (stateParam) {
    const { refresh, csrfToken } = getState(stateParam);
    if (!csrfToken)
      return NextResponse.redirect(
        `${BASE_REDIRECT_URI}?error=Some error occurred. Please reach out to @thesociocube on instagram`,
      );
    if (accessCode) {
      const instagramData = await getLongLivedToken(accessCode, REDIRECT_URI);
      if (!instagramData)
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=Our instagram api is down currently. Please reach out to @thesociocube on instagram`,
        );
      const { accessToken, userId } = instagramData;

      if (!accessToken || !userId)
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=An error occurred while fetching your account. Please reach out to @thesociocube on instagram`,
        );
      const loggedInUserID = getUserIdFromRefreshToken(refresh);
      const [existingUserJoin] = await db
        .select()
        .from(InstagramDetails)
        .where(eq(InstagramDetails.appID, userId))
        .leftJoin(
          UserTable,
          eq(UserTable.instagramDetails, InstagramDetails.id),
        )
        .leftJoin(
          AgencyTable,
          eq(AgencyTable.instagramDetails, InstagramDetails.id),
        );
      if (existingUserJoin?.agency) {
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=An agency is using this account, please unlink account from the agency`,
        );
      }
      const existingUser = existingUserJoin?.user;
      let refreshToken;
      if (existingUser) {
        if (loggedInUserID && existingUser.id !== loggedInUserID) {
          return NextResponse.redirect(
            `${BASE_REDIRECT_URI}?error=An account with this instagram already exists. Please visit login page and sign-in with Instagram`,
          );
        }
        await db
          .update(InstagramDetails)
          .set({ accessToken, accessTokenUpdatedAt: new Date() })
          .where(eq(InstagramDetails.appID, userId));
        refreshToken = await updateRefreshTokenAndScope(
          existingUser.id,
          existingUser.refreshTokens,
        );
      } else if (loggedInUserID) {
        const personalInfo = (await getGraphData(`me`, accessToken, [
          "name",
          "profile_picture_url",
          "followers_count",
          "username",
          "biography",
          "media_count",
        ])) as {
          name: string;
          profile_picture_url?: string;
          followers_count: number;
          media_count: number;
          username: string;
          biography?: string;
        };
        if (!personalInfo.username)
          return NextResponse.redirect(
            `${BASE_REDIRECT_URI}?error=An error occurred while fetching your details. Please reach out to @thesociocube on instagram`,
          );
        const [existingUnverifiedInstagram] = await db
          .select()
          .from(InstagramDetails)
          .where(eq(InstagramDetails.username, personalInfo.username))
          .leftJoin(
            UserTable,
            eq(UserTable.instagramDetails, InstagramDetails.id),
          )
          .leftJoin(
            AgencyTable,
            eq(AgencyTable.instagramDetails, InstagramDetails.id),
          );
        if (existingUnverifiedInstagram) {
          if (existingUnverifiedInstagram.user) {
            const accountGettingVerified =
              existingUnverifiedInstagram.user.id === loggedInUserID;
            await db
              .update(UserTable)
              .set({
                instagramDetails: null,
                isOnboarded: accountGettingVerified ? undefined : false,
              })
              .where(eq(UserTable.id, existingUnverifiedInstagram.user.id));
          }
          if (existingUnverifiedInstagram.agency) {
            await db
              .update(AgencyTable)
              .set({
                instagramDetails: null,
              })
              .where(eq(AgencyTable.id, existingUnverifiedInstagram.agency.id));
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
        const { posts, stats } = await getPosts(
          personalInfo.followers_count,
          loggedInUserID,
          accessToken,
          personalInfo.username,
        );
        if (posts.length > 0)
          await db
            .insert(InstagramMediaTable)
            .values(posts)
            .onConflictDoNothing();

        const id = await db.transaction(async (tx) => {
          const [inserted] = await tx
            .insert(InstagramDetails)
            .values({
              appID: userId,
              username: personalInfo.username,
              followers: personalInfo.followers_count,
              accessToken,
              mediaCount: personalInfo.media_count,
              ...stats,
            })
            .returning();
          if (!inserted) return tx.rollback();
          const externalDetails = await getInstagramDataExternalAPI(
            personalInfo.username,
          );
          const instagramPhotoURL =
            externalDetails?.profile_picture_url ||
            personalInfo.profile_picture_url;
          const loggedInUser = await getUser(eq(UserTable.id, loggedInUserID));
          if (loggedInUser) {
            refreshToken = await updateRefreshTokenAndScope(
              loggedInUser.id,
              loggedInUser.refreshTokens,
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
          return inserted.id;
        });
        if (!id)
          return NextResponse.redirect(
            `${BASE_REDIRECT_URI}?error=An error occurred while creating a new account. Please reach out to @thesociocube on instagram`,
          );
      } else {
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=This instagram is not linked to any account. Please create a new account`,
        );
      }
      return NextResponse.redirect(
        `${BASE_REDIRECT_URI}?refresh=${refreshToken}&csrf_token=${csrfToken}`,
      );
    }
  }
  const refresh = req.nextUrl.searchParams.get("refresh") || "";
  const csrfToken = req.nextUrl.searchParams.get("csrf_token") || "";
  if (!csrfToken)
    return NextResponse.redirect(
      `${BASE_REDIRECT_URI}?error=Sign in cancelled`,
    );
  return NextResponse.redirect(
    getInstagramAuthorizationUrl(
      createState({
        csrfToken,
        refresh,
      }),
      REDIRECT_URI,
    ),
  );
};
