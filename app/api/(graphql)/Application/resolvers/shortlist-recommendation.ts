import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { waitUntil } from "@vercel/functions";
import { and, eq } from "drizzle-orm";

import { PostingTable } from "../../Posting/db";
import { UserTable } from "../../User/db";
import { ApplicationStatus, ApplicationTable } from "../db";

export async function shortlistUser(
  ctx: AuthorizedContext,
  userID: number,
  postingID: number,
) {
  const [res] = await db
    .select()
    .from(PostingTable)
    .where(
      and(eq(PostingTable.id, postingID), eq(PostingTable.agency, ctx.userId)),
    );
  if (!res) throw GQLError(404, "User does not have permission");
  const [existingApplication] = await db
    .select()
    .from(ApplicationTable)
    .where(
      and(
        eq(ApplicationTable.posting, postingID),
        eq(ApplicationTable.user, userID),
      ),
    );
  if (existingApplication) throw GQLError(404, "User already applied");
  await db.insert(ApplicationTable).values({
    status: ApplicationStatus.Shortlisted,
    user: userID,
    posting: postingID,
    external: !!res.externalLink,
  });

  // Send email notification to the influencer
  waitUntil(
    (async () => {
      try {
        // Get the user's email
        const [user] = await db
          .select({
            email: UserTable.email,
            emailVerified: UserTable.emailVerified,
          })
          .from(UserTable)
          .where(eq(UserTable.id, userID));

        // Get the brand name
        const [brand] = await db
          .select({
            name: UserTable.name,
          })
          .from(UserTable)
          .where(eq(UserTable.id, ctx.userId));

        // Send the email notification
        if (user?.email && user.emailVerified) {
          await sendTemplateEmail(user.email, "ApplicationShortlisted", {
            campaignName: res.title,
            brandName: brand?.name || "The brand",
          });
        }
      } catch (error) {
        console.error("Error sending application shortlisted email:", error);
      }
    })(),
  );

  return true;
}
