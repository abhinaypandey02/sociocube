import { db } from "@backend/lib/db";
import { and, desc, eq, isNotNull, ne } from "drizzle-orm";
import { Field, ObjectType } from "type-graphql";

import { InstagramDetails } from "../../Instagram/db";
import { InstagramMediaTable } from "../../Instagram/db2";
import { UserTable } from "../db";

@ObjectType("GetFeaturedPostsResponse")
export class GetFeaturedPostsResponse {
  @Field()
  mediaURL: string;
  @Field()
  postURL: string;
  @Field()
  thumbnailURL: string;
  @Field()
  likes: number;
  @Field()
  er: number;
  @Field()
  creatorName: string;
  @Field()
  creatorUsername: string;
  @Field()
  creatorImage?: string;
  @Field()
  creatorVerified: boolean;
}

export async function handleGetFeaturedPosts(): Promise<
  GetFeaturedPostsResponse[]
> {
  const data = await db
    .select()
    .from(
      db
        .selectDistinctOn([InstagramMediaTable.user])
        .from(InstagramMediaTable)
        .where(
          and(
            eq(InstagramMediaTable.isVideo, true),
            isNotNull(InstagramMediaTable.mediaURL),
          ),
        )
        .orderBy(
          desc(InstagramMediaTable.user),
          desc(InstagramMediaTable.likes),
        )
        .as("instagram_post"),
    )
    .innerJoin(
      UserTable,
      and(
        isNotNull(UserTable.photo),
        isNotNull(UserTable.name),
        isNotNull(UserTable.username),
        ne(UserTable.id, 368),
        eq(InstagramMediaTable.user, UserTable.id),
      ),
    )
    .innerJoin(
      InstagramDetails,
      eq(InstagramDetails.id, UserTable.instagramDetails),
    )
    .orderBy(desc(InstagramMediaTable.likes))
    .limit(10);
  return data.map((post) => ({
    mediaURL: post.instagram_post.mediaURL || "",
    postURL: post.instagram_post.link,
    thumbnailURL: post.instagram_post.thumbnail,
    likes: post.instagram_post.likes,
    er: post.instagram_post.er || 0,
    creatorName: post.user.name || "",
    creatorUsername: post.user.username || "",
    creatorImage: post.user.photo || "",
    creatorVerified: post.instagram_data.isVerified,
  }));
}
