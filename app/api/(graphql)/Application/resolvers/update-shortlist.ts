import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { waitUntil } from "@vercel/functions";
import { and, eq } from "drizzle-orm";

import { PostingTable } from "../../Posting/db";
import { UserTable } from "../../User/db";
import { ApplicationStatus, ApplicationTable } from "../db";

export async function updateShortlist(
  ctx: AuthorizedContext,
  id: number,
  accepted: boolean,
) {
  const [res] = await db
    .update(ApplicationTable)
    .set({
      status: ApplicationStatus.Selected,
    })
    .where(
      and(
        eq(ApplicationTable.id, id),
        eq(
          ApplicationTable.status,
          accepted ? ApplicationStatus.Shortlisted : ApplicationStatus.Denied,
        ),
        eq(ApplicationTable.user, ctx.userId),
      ),
    )
    .returning();

  // Send email notification to the brand
  waitUntil(
    (async () => {
      try {
        if (!res) return;
        // Get the posting details and brand ID
        const [posting] = await db
          .select({
            title: PostingTable.title,
            agencyId: PostingTable.agency,
          })
          .from(PostingTable)
          .where(eq(PostingTable.id, res.posting));

        if (posting) {
          // Get the brand's email
          const [brand] = await db
            .select({
              email: UserTable.email,
              emailVerified: UserTable.emailVerified,
            })
            .from(UserTable)
            .where(eq(UserTable.id, posting.agencyId));

          // Get the influencer's details
          const [influencer] = await db
            .select({
              name: UserTable.name,
              username: UserTable.username,
            })
            .from(UserTable)
            .where(eq(UserTable.id, ctx.userId));

          // Send the email notification
          if (brand?.email && brand.emailVerified && influencer) {
            if (accepted) {
              // Send acceptance email
              await sendTemplateEmail(brand.email, "ShortlistAccepted", {
                campaignName: posting.title,
                influencerName: influencer.name || "An influencer",
                influencerUsername: influencer.username || "unknown",
                campaignID: id,
              });
            } else {
              // Send denial email
              await sendTemplateEmail(brand.email, "ShortlistDenied", {
                campaignName: posting.title,
                influencerName: influencer.name || "An influencer",
                influencerUsername: influencer.username || "unknown",
                campaignID: id,
              });
            }
          }
        }
      } catch (error) {
        console.error(
          `Error sending shortlist ${accepted ? "accepted" : "denied"} email:`,
          error,
        );
      }
    })(),
  );

  return true;
}
