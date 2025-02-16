import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { AgencyOnboardingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { InstagramDetails } from "../../../Instagram/db/schema";
import { getInstagramDataExternalAPI } from "../../../../../auth/instagram/utils";
import { UserTable } from "../../../User/db/schema";
import { uploadImage } from "../../../../../../lib/storage/aws-s3";
import { InstagramMediaTable } from "../../../Instagram/db/schema2";

export async function addAgencyInstagramUsername(
  ctx: AuthorizedContext,
  username: string,
): Promise<boolean> {
  const data = await getInstagramDataExternalAPI(username);
  if (!data?.insta_username) {
    throw GQLError(
      500,
      "Unable to fetch instagram profile, check username and ensure it's a public profile. Also try other method.",
    );
  }
  const [userDetails] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, ctx.userId))
    .innerJoin(
      InstagramDetails,
      eq(InstagramDetails.id, UserTable.instagramDetails),
    );
  if (
    userDetails?.instagram_data &&
    userDetails.instagram_data.username === username
  ) {
    await db
      .delete(InstagramMediaTable)
      .where(eq(InstagramMediaTable.user, ctx.userId));
    await db
      .update(UserTable)
      .set({
        instagramDetails: null,
        isOnboarded: false,
      })
      .where(eq(UserTable.id, ctx.userId));
    await db.insert(AgencyOnboardingTable).values({
      instagramDetails: userDetails.instagram_data.id,
      user: ctx.userId,
      name: data.name || "",
      photo:
        data.profile_picture_url &&
        (await uploadImage(data.profile_picture_url, [
          "User",
          ctx.userId.toString(),
          "agency-photo",
        ])),
      bio: data.biography,
    });
    return true;
  }
  const [existingDetails] = await db
    .select()
    .from(InstagramDetails)
    .where(eq(InstagramDetails.username, username));

  if (existingDetails) {
    if (existingDetails.accessToken) {
      throw GQLError(
        500,
        "This profile is already in use. Please use your own instagram account.",
      );
    } else {
      throw GQLError(
        500,
        "This profile is in use with another account. Please connect instagram account to take verified ownership.",
      );
    }
  }

  const [details] = await db
    .insert(InstagramDetails)
    .values({
      username: data.insta_username,
      followers: data.followers_count,
      mediaCount: data.total_media || data.total_media_public_profile,
      lastFetchedInstagramStats: new Date(),
    })
    .returning({ id: InstagramDetails.id });
  if (details) {
    await db.insert(AgencyOnboardingTable).values({
      instagramDetails: details.id,
      user: ctx.userId,
      name: data.name || "",
      photo: data.profile_picture_url,
      bio: data.biography,
    });
  }
  return true;
}
