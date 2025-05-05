import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { getPostingCacheTag } from "@/constants/revalidate";

import { PostingTable } from "../db";

export async function resumePosting(
  ctx: AuthorizedContext,
  postingID: number,
): Promise<boolean> {
  await db
    .update(PostingTable)
    .set({ open: true })
    .where(
      and(eq(PostingTable.id, postingID), eq(PostingTable.agency, ctx.userId)),
    );
  revalidateTag(getPostingCacheTag(postingID));
  return true;
}
