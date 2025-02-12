import { and, eq, isNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { UserTable } from "../../../db/schema";
import GQLError from "../../../../../constants/errors";
import { getInstagramDataExternalAPI } from "../../../../../../auth/instagram/utils";
import { InstagramDetails } from "../../../../Instagram/db/schema";
import { getCurrentUser } from "../../../utils";
import { uploadImage } from "../../../../../../../lib/storage/aws-s3";
import { getPosts } from "../../field/instagram";
import { InstagramMediaTable } from "../../../../Instagram/db/schema2";

export async function handleUpdateOnboardingInstagramUsername(
  ctx: AuthorizedContext,
  username: string,
) {
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
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403, "User not found");
  const { posts, stats } = await getPosts(
    data.followers_count,
    ctx.userId,
    undefined,
    data.insta_username,
  );
  await db
    .delete(InstagramMediaTable)
    .where(eq(InstagramMediaTable.user, ctx.userId));
  await db.insert(InstagramMediaTable).values(posts).onConflictDoNothing();
  const [details] = await db
    .insert(InstagramDetails)
    .values({
      username: data.insta_username,
      followers: data.followers_count,
      mediaCount: data.total_media || data.total_media_public_profile,
      ...stats,
    })
    .returning({ id: InstagramDetails.id });
  if (details) {
    await db
      .update(UserTable)
      .set({
        instagramDetails: details.id,
        photo:
          user.photo ||
          (data.profile_picture_url &&
            (await uploadImage(data.profile_picture_url, [
              "User",
              user.id.toString(),
              "photo",
            ]))),
        bio: user.bio || data.biography,
      })
      .where(
        and(eq(UserTable.id, ctx.userId), isNull(UserTable.instagramDetails)),
      );
  }
  return true;
}
