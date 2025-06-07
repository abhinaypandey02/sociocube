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
import { PostingTable } from "@graphql/Posting/db";
import { SubscriptionTable } from "@graphql/Subscription/db";
import { addUsage, getPendingUsage } from "@graphql/Subscription/utils";
import { UserTable } from "@graphql/User/db";
import { waitUntil } from "@vercel/functions";
import { and, eq, inArray, sql } from "drizzle-orm";

import { MaxUsages, SubscriptionPlan, UsageType } from "@/lib/usages";

import { ApplicationStatus, ApplicationTable } from "../../Application/db";

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
    .innerJoin(UserTable, eq(UserTable.id, PostingTable.agency))
    .leftJoin(SubscriptionTable, eq(SubscriptionTable.user, UserTable.id));
  if (!posting) throw GQLError(400, "Posting not found");

  const pendingPostingAnnouncements = await getPendingUsage({
    plan: posting.subscription?.plan,
    feature: UsageType.PostingAnnouncement,
    thresholdHours: 0,
    userID: ctx.userId,
    key: postingID,
  });

  if (pendingPostingAnnouncements < 0)
    throw GQLError(
      400,
      `You can only send ${MaxUsages[UsageType.PostingAnnouncement][posting.subscription?.plan || SubscriptionPlan.Free]} announcements per posting.`,
    );

  const pendingDailyUsages = await getPendingUsage({
    plan: posting.subscription?.plan,
    feature: UsageType.PostingAnnouncement,
    thresholdUsage: MaxUsages.GlobalAnnouncement,
    userID: ctx.userId,
  });

  if (pendingDailyUsages <= 0)
    throw GQLError(
      400,
      `You can only send ${MaxUsages.GlobalAnnouncement[posting.subscription?.plan || SubscriptionPlan.Free]} announcements per posting.`,
    );

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
  addUsage({
    userID: ctx.userId,
    feature: UsageType.PostingAnnouncement,
    key: postingID,
  });
  waitUntil(
    sendEvent(
      conversations.map((conversation) => ({
        channel: getConversationChannelName(conversation),
        name: NEW_MESSAGE,
        data: {
          conversation,
          body,
          by: ctx.userId,
        },
      })),
    ),
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
