import { THREADS_ACCESS_TOKEN } from "@backend/(rest)/threads/route";
import { db } from "@backend/lib/db";
import { ConfigTable } from "@graphql/Config/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { getShareText } from "@/app/(dashboard)/campaigns/[id]/utils";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

export const POST = async (req: NextRequest) => {
  const { id } = (await req.json()) as {
    id: number;
  };
  const res = await queryGQL(GET_POSTING, { id });
  if (!res.posting) {
    return new NextResponse("Posting not found");
  }
  const text = getShareText(res.posting);
  const [token] = await db
    .select()
    .from(ConfigTable)
    .where(eq(ConfigTable.key, THREADS_ACCESS_TOKEN));
  if (!token) return new NextResponse("No token");
  try {
    // const res = await fetch(
    //   "https://graph.threads.net/v1.0/>/threads?media_type=IMAGE&image_url=https://www.example.com/images/bronz-fonz.jpg&text=#BronzFonz&access_token=<ACCESS_TOKEN>",
    // );
  } catch (e: unknown) {
    console.error(e);
    return new NextResponse((e as Error).message, { status: 501 });
  }
};
