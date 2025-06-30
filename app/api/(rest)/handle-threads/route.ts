import { THREADS_ACCESS_TOKEN } from "@backend/(rest)/threads/constants";
import { db } from "@backend/lib/db";
import { ConfigTable } from "@graphql/Config/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { thread, token: authToken } = await req.json();
  if (authToken !== process.env.WHATSAPP_AUTH)
    return new NextResponse("token not found");
  if (!thread) return new NextResponse("id not found");
  const [token] = await db
    .select()
    .from(ConfigTable)
    .where(eq(ConfigTable.key, THREADS_ACCESS_TOKEN));
  if (!token) return new NextResponse("No token");
  const firstThread = thread[0];
  try {
    let container = await fetch(
      `https://graph.threads.net/v1.0/me/threads?media_type=TEXT&access_token=${token.value}&text=${firstThread.split("\n").join("%0A")}`,
      { method: "POST" },
    );

    for (let i = 0; i < thread.length; i++) {
      const containerRes = await container.json();
      if (!containerRes.id) {
        return new NextResponse("Cant create container");
      }

      const post = await fetch(
        `https://graph.threads.net/v1.0/me/threads_publish?creation_id=${containerRes.id}&access_token=${token.value}`,
        { method: "POST" },
      );

      const postRes = await post.json();
      if (!postRes.id) {
        return new NextResponse("Cant create post");
      }
      if (i > 0) {
        container = await fetch(
          `https://graph.threads.net/v1.0/me/threads?media_type=TEXT&text=${thread[i].split("\n").join("%0A")}&reply_to_id=${postRes.id}&access_token=${token.value}"
`,
          { method: "POST" },
        );
      }
    }

    return new NextResponse("Post created successfully");
  } catch (e: unknown) {
    console.error(e);
    return new NextResponse((e as Error).message, { status: 501 });
  }
};
