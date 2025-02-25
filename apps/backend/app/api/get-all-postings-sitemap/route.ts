import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { PostingTable } from "../../graphql/types/Posting/db/schema";

export const GET = async () => {
  const postings = await db
    .select({ id: PostingTable.id })
    .from(PostingTable)
    .where(eq(PostingTable.open, true));
  return new NextResponse(JSON.stringify([...postings.map(({ id }) => id)]));
};
