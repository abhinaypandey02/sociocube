import { db } from "@backend/lib/db";
import { SocialPostsTable } from "@graphql/SocialPosts/db";
import { eq } from "drizzle-orm";

import { getShareText } from "@/app/(dashboard)/campaigns/[id]/utils";
import { getClient } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

export async function postThread(thread: string[]) {
  const firstThread = thread[0];
  const token = process.env.THREADS_ACCESS_TOKEN;
  try {
    let container = await fetch(
      `https://graph.threads.net/v1.0/me/threads?media_type=TEXT&access_token=${token}&text=${firstThread?.split("\n").join("%0A")}`,
      { method: "POST" },
    );

    for (let i = 0; i < thread.length; i++) {
      const containerRes = await container.json();
      if (!containerRes.id) {
        console.error("Cant create container");
        return false;
      }

      const post = await fetch(
        `https://graph.threads.net/v1.0/me/threads_publish?creation_id=${containerRes.id}&access_token=${token}`,
        { method: "POST" },
      );

      const postRes = await post.json();
      if (!postRes.id) {
        console.error("Cant create post");
        return false;
      }
      if (thread[i + 1]) {
        container = await fetch(
          `https://graph.threads.net/v1.0/me/threads?media_type=TEXT&text=${thread[i + 1]?.split("\n").join("%0A")}&reply_to_id=${postRes.id}&access_token=${token}"
`,
          { method: "POST" },
        );
      }
    }

    return true;
  } catch (e: unknown) {
    console.error(e);
    return false;
  }
}

export async function getWhatsappNextPost() {
  const [post] = await db
    .select()
    .from(SocialPostsTable)
    .where(eq(SocialPostsTable.platform, "whatsapp"));
  if (post)
    await db.delete(SocialPostsTable).where(eq(SocialPostsTable.id, post.id));
  return post?.body;
}

export async function queuePost(id: number) {
  const client = getClient();
  const postingRes = await client.query({
    query: GET_POSTING,
    variables: { id },
  });
  if (!postingRes.data.posting) {
    console.error("error while creating posting. it returned null");
    return false;
  }
  const body = getShareText(postingRes.data.posting);
  await db.insert(SocialPostsTable).values([
    {
      body,
      platform: "whatsapp",
      id,
    },
    {
      body,
      platform: "threads",
      id,
    },
  ]);
}
