import { and, eq, isNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { UserTable } from "../../../db/schema";
import GQLError from "../../../../../constants/errors";
import { getInstagramDataExternalAPI } from "../../../../../../auth/instagram/utils";
import { InstagramDetails } from "../../../../Instagram/db/schema";
import { getCurrentUser } from "../../../utils";
import { uploadImage } from "../../../../../../../lib/storage/aws-s3";
import { InstagramMediaTable } from "../../../../Instagram/db/schema2";
import { fetchUploadedPostsAndStats } from "../../../../Instagram/utils";

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
  if (!data?.username) {
    throw GQLError(
      500,
      "Unable to fetch instagram profile, check username and ensure it's a public profile. Also try other method.",
    );
  }
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403, "User not found");
  const { posts, stats } = await fetchUploadedPostsAndStats(
    data.follower_count,
    ctx.userId,
    undefined,
    data.username,
  );
  if (posts) {
    await db.insert(InstagramMediaTable).values(posts).onConflictDoNothing();
  }
  const [details] = await db
    .insert(InstagramDetails)
    .values({
      username: data.username,
      followers: data.follower_count,
      mediaCount: data.media_count,
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
          (data.profile_pic_url_hd &&
            (await uploadImage(data.profile_pic_url_hd, [
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
