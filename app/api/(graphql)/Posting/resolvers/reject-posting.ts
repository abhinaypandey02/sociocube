import { db } from "@backend/lib/db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { ApplicationTable } from "@graphql/Application/db";
import { UserTable } from "@graphql/User/db";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { getPostingCacheTag } from "@/constants/revalidate";

import { PostingTable } from "../db";

export async function rejectPosting(
  postingID: number,
  reason: string,
): Promise<boolean> {
  await db
    .delete(ApplicationTable)
    .where(eq(PostingTable.id, ApplicationTable.posting));
  const [posting] = await db
    .delete(PostingTable)
    .where(and(eq(PostingTable.id, postingID), eq(PostingTable.inReview, true)))
    .returning();
  if (posting) {
    const [agency] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, posting.agency));
    if (agency)
      await sendTemplateEmail(agency.email, "CampaignRejected", {
        campaignName: posting.title,
        reason,
      });
  }
  revalidateTag(getPostingCacheTag(postingID));
  return true;
}
