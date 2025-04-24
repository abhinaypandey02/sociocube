import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { uploadImage } from "@backend/lib/storage/aws-s3";
import { waitUntil } from "@vercel/functions";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { Field, ObjectType } from "type-graphql";

import { InstagramDetails } from "../../Instagram/db";
import { InstagramMediaTable } from "../../Instagram/db2";
import {
  fetchExternalInstagramDetails,
  fetchUploadedPostsAndStats,
} from "../../Instagram/utils";
import { UserTable } from "../db";
import { getCurrentUser } from "../utils";

@ObjectType("UpdateInstagramUsernameResponse")
export class UpdateInstagramUsernameResponse {
  @Field({ nullable: true })
  photo?: string;
  @Field()
  bio: string;
  @Field()
  username: string;
  @Field()
  name: string;
}

export async function handleUpdateInstagramUsername(
  ctx: AuthorizedContext,
  username: string,
) {
  const [data, user] = await Promise.all([
    fetchExternalInstagramDetails(username),
    getCurrentUser(ctx),
  ]);
  if (!data?.username) {
    throw GQLError(
      500,
      "Unable to fetch instagram profile, check username and ensure it's a public profile. Contact @thesociocube on instagram.",
    );
  }
  if (!user) throw GQLError(403, "User not found");

  const fetchedUsername = data.username.replaceAll(".", "_");
  const updateUsername = user.username || fetchedUsername;
  waitUntil(
    (async () => {
      const [existingUsernameUser] = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.username, fetchedUsername));
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
          await db
            .update(UserTable)
            .set({
              instagramDetails: existingDetails.id,
              photo:
                data.photo &&
                (await uploadImage(data.photo, [
                  "User",
                  ctx.userId.toString(),
                  "photo",
                ])),
              bio: user.bio || data.bio,
              username: existingUsernameUser ? undefined : updateUsername,
              name: data.name,
            })
            .where(and(eq(UserTable.id, ctx.userId)));
        }
      } else {
        const { posts, stats } = await fetchUploadedPostsAndStats(
          data.followers,
          ctx.userId,
          undefined,
          data.username,
        );
        if (posts?.length) {
          await db
            .insert(InstagramMediaTable)
            .values(posts)
            .onConflictDoNothing();
        }
        const [details] = await db
          .insert(InstagramDetails)
          .values({
            username: data.username,
            followers: data.followers,
            mediaCount: data.mediaCount,
            ...stats,
          })
          .returning({ id: InstagramDetails.id });
        if (details) {
          await db
            .update(UserTable)
            .set({
              instagramDetails: details.id,
              photo:
                data.photo &&
                (await uploadImage(data.photo, [
                  "User",
                  user.id.toString(),
                  "photo",
                ])),
              bio: user.bio || data.bio,
              username: existingUsernameUser ? undefined : updateUsername,
              name: data.name,
            })
            .where(and(eq(UserTable.id, ctx.userId)));
        }
      }
    })(),
  );
  revalidateTag(`profile-${updateUsername}`);
  return {
    photo: data.photo,
    bio: user.bio || data.bio || "",
    username: updateUsername,
    name: data.name || "",
  };
}
