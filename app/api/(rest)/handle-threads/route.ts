import {
  LAST_POST_CREATED,
  THREADS_ACCESS_TOKEN,
} from "@backend/(rest)/threads/constants";
import { db } from "@backend/lib/db";
import { ConfigTable } from "@graphql/Config/db";
import { and, eq, gte, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { getShareText } from "@/app/(dashboard)/campaigns/[id]/utils";
import { getClient } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

export const GET = async (req: NextRequest) => {
  const idParam = req.nextUrl.searchParams.get("id");
  if (!idParam) return new NextResponse("id not found");
  const id = parseInt(idParam);
  const client = getClient();
  const res = await client.query({ query: GET_POSTING, variables: { id } });
  if (!res.data.posting) {
    return new NextResponse("Posting not found");
  }
  const text = getShareText(res.data.posting);
  const [token] = await db
    .select()
    .from(ConfigTable)
    .where(eq(ConfigTable.key, THREADS_ACCESS_TOKEN));
  if (!token) return new NextResponse("No token");

  const lastPostMinimumTime = new Date();
  lastPostMinimumTime.setHours(lastPostMinimumTime.getHours() - 1);

  const [lastPost] = await db
    .select()
    .from(ConfigTable)
    .where(
      and(
        eq(ConfigTable.key, LAST_POST_CREATED),
        or(
          eq(ConfigTable.value, idParam),
          gte(ConfigTable.updatedAt, lastPostMinimumTime),
        ),
      ),
    );
  if (lastPost) {
    return new NextResponse("Cooldown");
  }
  try {
    const res = await fetch(
      `https://graph.threads.net/v1.0/me/threads?media_type=TEXT&access_token=${token.value}&text=${text.split("\n").slice(0, -1).join("%0A")}`,
      { method: "POST" },
    );
    const containerRes = await res.json();
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
    const replyContainer = await fetch(
      `https://graph.threads.net/v1.0/me/threads?media_type=TEXT&text=${text.split("\n").at(-1)}&reply_to_id=${postRes.id}&access_token=${token.value}"
`,
      { method: "POST" },
    );

    const replyContainerRes = await replyContainer.json();
    if (!replyContainerRes.id) {
      return new NextResponse("Cant create reply container");
    }

    const reply = await fetch(
      `https://graph.threads.net/v1.0/me/threads_publish?creation_id=${replyContainerRes.id}&access_token=${token.value}`,
      { method: "POST" },
    );

    const replyRes = await reply.json();
    if (!replyRes.id) {
      return new NextResponse("Cant create reply");
    }
    await db
      .update(ConfigTable)
      .set({
        key: LAST_POST_CREATED,
        value: id.toString(),
        updatedAt: new Date(),
      })
      .where(eq(ConfigTable.key, LAST_POST_CREATED));
    return new NextResponse("Post created successfully");
  } catch (e: unknown) {
    console.error(e);
    return new NextResponse((e as Error).message, { status: 501 });
  }
};
