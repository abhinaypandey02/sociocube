import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { AgencyOnboardingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { InstagramDetails } from "../../../Instagram/db/schema";
import { getInstagramDataExternalAPI } from "../../../../../auth/instagram/utils";

export async function addAgencyInstagramUsername(
  ctx: AuthorizedContext,
  username: string,
): Promise<boolean> {
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
  const data = await getInstagramDataExternalAPI(username);
  if (!data?.insta_username) {
    throw GQLError(
      500,
      "Unable to fetch instagram profile, check username and ensure it's a public profile. Also try other method.",
    );
  }
  const [details] = await db
    .insert(InstagramDetails)
    .values({
      username: data.insta_username,
      followers: data.followers_count,
      lastFetchedInstagramStats: new Date(),
    })
    .returning({ id: InstagramDetails.id });
  if (details) {
    await db.insert(AgencyOnboardingTable).values({
      instagramDetails: details.id,
      user: ctx.userId,
      name: data.name || "",
      photo: data.profile_picture_url,
      about: data.biography,
    });
  }
  return true;
}
