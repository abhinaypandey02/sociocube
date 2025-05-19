import { db } from "@backend/lib/db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { UserTable } from "@graphql/User/db";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { getPostingCacheTag } from "@/constants/revalidate";

import { PostingTable } from "../db";

export async function acceptPosting(postingID: number): Promise<boolean> {
  const [posting] = await db
    .update(PostingTable)
    .set({ inReview: false })
    .where(and(eq(PostingTable.id, postingID)))
    .returning();
  if (posting) {
    const [agency] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, posting.agency));
    if (agency)
      await sendTemplateEmail(agency.email, "CampaignApproved", {
        campaignName: posting.title,
        campaignID: postingID,
      });
  }
  revalidateTag(getPostingCacheTag(postingID));
  return true;
}
