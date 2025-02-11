import { NextRequest, NextResponse } from "next/server";
import { and, eq, or } from "drizzle-orm";
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
  getGraphData,
  getInstagramAuthorizationUrl,
  getInstagramDataExternalAPI,
  getLongLivedToken,
} from "../instagram/utils";
import {
  AgencyMember,
  AgencyOnboardingTable,
  AgencyTable,
} from "../../graphql/types/Agency/db/schema";
import { AgencyMemberType } from "../../graphql/constants/agency-member-type";

const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/instagram-agency`;

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

      if (!loggedInUserID)
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=No user logged in`,
        );
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
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=An error occurred while fetching your details. Please reach out to @thesociocube on instagram`,
        );
      const [existingUserJoin] = await db
        .select()
        .from(InstagramDetails)
        .where(
          or(
            eq(InstagramDetails.appID, userId),
            eq(InstagramDetails.username, personalInfo.username),
          ),
        )
        .leftJoin(
          UserTable,
          eq(UserTable.instagramDetails, InstagramDetails.id),
        )
        .leftJoin(
          AgencyTable,
          eq(AgencyTable.instagramDetails, InstagramDetails.id),
        );
      const existingUser = existingUserJoin?.user;
      const existingAgency = existingUserJoin?.agency;
      const [userAgency] = await db
        .select()
        .from(AgencyMember)
        .where(
          and(
            eq(AgencyMember.user, loggedInUserID),
            eq(AgencyMember.type, AgencyMemberType.Owner),
          ),
        );
      if (userAgency?.agency === existingAgency?.id) {
        await db
          .update(InstagramDetails)
          .set({ accessToken, accessTokenUpdatedAt: new Date() })
          .where(eq(InstagramDetails.appID, userId));
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?success=Updated instagram details`,
        );
      }
      if (userAgency)
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=You already own an agency`,
        );
      if (existingUser) {
        await db
          .update(UserTable)
          .set({ instagramDetails: null, isOnboarded: false })
          .where(eq(UserTable.id, existingUser.id));
      }
      if (existingAgency) {
        await db
          .update(AgencyTable)
          .set({ instagramDetails: null })
          .where(eq(AgencyTable.id, existingAgency.id));
      }
      if (existingUser || existingAgency) {
        await db
          .delete(InstagramDetails)
          .where(eq(InstagramDetails.id, existingUserJoin.instagram_data.id));
      }

      const id = await db.transaction(async (tx) => {
        const [inserted] = await tx
          .insert(InstagramDetails)
          .values({
            appID: userId,
            username: personalInfo.username,
            followers: personalInfo.followers_count,
            lastFetchedInstagramStats: new Date(),
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
        await db.insert(AgencyOnboardingTable).values({
          instagramDetails: inserted.id,
          user: loggedInUserID,
          name: personalInfo.name || "",
          photo: instagramPhotoURL,
          about: personalInfo.biography || "",
        });
        return inserted.id;
      });
      if (!id)
        return NextResponse.redirect(
          `${BASE_REDIRECT_URI}?error=An error occurred while creating a new account. Please reach out to @thesociocube on instagram`,
        );
      return NextResponse.redirect(BASE_REDIRECT_URI);
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
