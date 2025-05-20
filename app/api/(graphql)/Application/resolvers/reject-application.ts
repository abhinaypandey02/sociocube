import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { waitUntil } from "@vercel/functions";
import { and, eq } from "drizzle-orm";

import { PostingTable } from "../../Posting/db";
import { UserTable } from "../../User/db";
import { ApplicationStatus, ApplicationTable } from "../db";

export async function rejectApplication(ctx: AuthorizedContext, id: number) {
  const [res] = await db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.id, id))
    .innerJoin(
      PostingTable,
      and(
        eq(PostingTable.id, ApplicationTable.posting),
        eq(PostingTable.agency, ctx.userId),
      ),
    );
  if (!res) throw GQLError(404, "User does not have permission");
  if (res.application.status === ApplicationStatus.Rejected) return true;
  await db
    .update(ApplicationTable)
    .set({
      status: ApplicationStatus.Rejected,
    })
    .where(eq(ApplicationTable.id, id));

  // Send email notification to the influencer
  waitUntil(
    (async () => {
      try {
        if (res.application) {
          // Get the user's email
          const [user] = await db
            .select({
              email: UserTable.email,
              emailVerified: UserTable.emailVerified,
            })
            .from(UserTable)
            .where(eq(UserTable.id, res.application.user));

          // Get the brand name
          const [brand] = await db
            .select({
              name: UserTable.name,
            })
            .from(UserTable)
            .where(eq(UserTable.id, res.posting.agency));

          // Send the email notification
          if (user?.email && user.emailVerified) {
            await sendTemplateEmail(user.email, "ApplicationRejected", {
              campaignName: res.posting.title,
              brandName: brand?.name || "The brand",
            });
          }
        }
      } catch (error) {
        console.error("Error sending application rejected email:", error);
      }
    })(),
  );

  return true;
}
