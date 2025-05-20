import {
  getConversationChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendBatchTemplateEmail } from "@backend/lib/email/send-template";
import { sendEvent } from "@backend/lib/socket/send-event";
import { ConversationMessageTable, ConversationTable } from "@graphql/Chat/db";
import { PostingAnnouncement, PostingTable } from "@graphql/Posting/db";
import { UserTable } from "@graphql/User/db";
import { and, count, eq, gt, inArray, sql } from "drizzle-orm";

import { ApplicationStatus, ApplicationTable } from "../../Application/db";

const MAX_LIMIT = 3;
const MAX_DAILY_LIMIT = 1;

export async function handleSendAnnouncement(
  ctx: AuthorizedContext,
  postingID: number,
  body: string,
  apps: number[] | null,
) {
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(
      and(eq(PostingTable.id, postingID), eq(PostingTable.agency, ctx.userId)),
    )
    .innerJoin(UserTable, eq(UserTable.id, PostingTable.agency));
  if (!posting) throw GQLError(400, "Posting not found");
  const [existing] = await db
    .select({ count: count() })
    .from(PostingAnnouncement)
    .where(eq(PostingAnnouncement.posting, postingID));

  if (existing && existing.count >= MAX_LIMIT)
    throw GQLError(
      400,
      `You can only send ${MAX_LIMIT} announcements per posting.`,
    );

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
  if (daily && daily.count >= MAX_DAILY_LIMIT)
    throw GQLError(
      400,
      `You can only send ${MAX_DAILY_LIMIT} announcement per day. Please try again tomorrow.`,
    );

  await db.insert(PostingAnnouncement).values({
    posting: postingID,
    agency: ctx.userId,
    body,
  });
  const users = await db
    .select({
      email: UserTable.email,
      name: UserTable.name,
      conversation: ConversationTable.id,
      id: UserTable.id,
    })
    .from(ApplicationTable)
    .where(
      and(
        eq(ApplicationTable.posting, postingID),
        eq(ApplicationTable.status, ApplicationStatus.Selected),
        apps ? inArray(ApplicationTable.id, apps) : undefined,
      ),
    )
    .innerJoin(
      UserTable,
      and(
        eq(UserTable.id, ApplicationTable.user),
        eq(UserTable.emailVerified, true),
      ),
    )
    .leftJoin(
      ConversationTable,
      sql`array[${UserTable.id}, ${ctx.userId}] <@ ${ConversationTable.users}`,
    );

  if (!users.length) throw GQLError(400, "No users to send announcement to");

  const usersWithConversation = users.filter((user) => user.conversation);
  const usersWithoutConversation = users.filter((user) => !user.conversation);

  const createdConversations = usersWithoutConversation.length
    ? await db
        .insert(ConversationTable)
        .values(
          users
            .filter((user) => !user.conversation)
            .map((user) => ({
              users: [user.id, ctx.userId],
            })),
        )
        .returning({
          conversation: ConversationTable.id,
        })
    : [];

  const conversations = [...usersWithConversation, ...createdConversations]
    .map(({ conversation }) => conversation)
    .filter(Boolean) as number[];

  await db.insert(ConversationMessageTable).values(
    conversations.map((conversation) => ({
      conversation: conversation!,
      body,
      by: ctx.userId,
    })),
  );
  await sendEvent(
    conversations.map((conversation) => ({
      channel: getConversationChannelName(conversation),
      name: NEW_MESSAGE,
      data: {
        conversation,
        body,
        by: ctx.userId,
      },
    })),
  );
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
  return true;
}
