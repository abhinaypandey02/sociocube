import { db } from "@backend/lib/db";
import { SocialPostsTable } from "@graphql/SocialPosts/db";
import { postThread } from "@graphql/SocialPosts/utils";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async () => {
  const [latestThread] = await db
    .select()
    .from(SocialPostsTable)
    .where(eq(SocialPostsTable.platform, "threads"));
  if (latestThread) {
    const msg = latestThread.body;
    const success = await postThread([
      [
        ...msg.split("\n").slice(0, -1),
        "Apply now from pinned comment 👇",
      ].join("\n"),
      msg.split("\n").at(-1) || "",
    ]);
    if (success) {
      await db
        .delete(SocialPostsTable)
        .where(
          and(
            eq(SocialPostsTable.platform, latestThread.platform),
            eq(SocialPostsTable.id, latestThread.id),
          ),
        );
      return new NextResponse();
    } else return new NextResponse("Error creating post", { status: 500 });
  }
};
