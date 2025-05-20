import { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { sendBatchTemplateEmail } from "@backend/lib/email/send-template";
import { PostingAnnouncement, PostingTable } from "@graphql/Posting/db";
import { UserTable } from "@graphql/User/db";
import { and, count, eq, gt } from "drizzle-orm";

import { ApplicationStatus, ApplicationTable } from "../../Application/db";

const MAX_LIMIT = 3;
const MAX_DAILY_LIMIT = 3;

export async function sendAnnouncement(
  ctx: AuthorizedContext,
  postingID: number,
  body: string,
) {
  const [existing] = await db
    .select({ count: count() })
    .from(PostingAnnouncement)
    .where(eq(PostingAnnouncement.id, postingID));

  if (existing && existing.count >= MAX_LIMIT) return false;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [daily] = await db
    .select({ count: count() })
    .from(PostingAnnouncement)
    .where(
      and(
        eq(PostingAnnouncement.agency, ctx.userId),
        gt(PostingAnnouncement.createdAt, yesterday),
      ),
    );
  if (daily && daily.count >= MAX_DAILY_LIMIT) return false;

  await db.insert(PostingAnnouncement).values({
    posting: postingID,
    agency: ctx.userId,
    body,
  });

  const users = await db
    .select({ email: UserTable.email, name: UserTable.name })
    .from(ApplicationTable)
    .where(
      and(
        eq(ApplicationTable.posting, postingID),
        eq(ApplicationTable.status, ApplicationStatus.Selected),
      ),
    )
    .innerJoin(
      UserTable,
      and(
        eq(UserTable.id, ApplicationTable.user),
        eq(UserTable.emailVerified, true),
      ),
    );
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, postingID))
    .innerJoin(UserTable, eq(UserTable.id, PostingTable.agency));
  if (posting?.user.username)
    await sendBatchTemplateEmail(
      "PostingAnnouncement",
      users.map((user) => ({
        to: user.email,
        meta: {
          brandName: posting.user.name || "Brand",
          postingName: posting.posting.title,
          postingId: posting.posting.id,
          username: posting.user.username!,
          announcementText: body,
        },
      })),
    );
}
