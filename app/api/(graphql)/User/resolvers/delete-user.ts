import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { deleteImage } from "@backend/lib/storage/aws-s3";
import { ApplicationTable } from "@graphql/Application/db";
import { InstagramDetails } from "@graphql/Instagram/db";
import { InstagramMediaTable } from "@graphql/Instagram/db2";
import { PortfolioTable } from "@graphql/Portfolio/db";
import { PostingTable } from "@graphql/Posting/db";
import { RequestTable } from "@graphql/Request/db";
import { ReviewTable } from "@graphql/Review/db";
import { arrayContains, eq, inArray } from "drizzle-orm";

import { sendTemplateEmail } from "@/app/api/lib/email/send-template";

import { ConversationMessageTable, ConversationTable } from "../../Chat/db";
import { LocationTable, PricingTable, UserTable } from "../db";

export async function deleteUser(ctx: AuthorizedContext): Promise<boolean> {
  if (!ctx.userId) throw GQLError(403);

  const id = ctx.userId;
  await db.delete(InstagramMediaTable).where(eq(InstagramMediaTable.user, id));
  await db.delete(PostingTable).where(eq(PostingTable.agency, id));
  await db.delete(ReviewTable).where(eq(ReviewTable.user, id));
  await db.delete(PortfolioTable).where(eq(PortfolioTable.user, id));
  await db.delete(ApplicationTable).where(eq(ApplicationTable.user, id));
  await db.delete(RequestTable).where(eq(RequestTable.user, id));
  await db.delete(PricingTable).where(eq(PricingTable.user, id));
  await db.delete(ConversationMessageTable).where(
    inArray(
      ConversationMessageTable.conversation,
      db
        .select({ id: ConversationTable.id })
        .from(ConversationTable)
        .where(arrayContains(ConversationTable.users, [id])),
    ),
  );
  await db
    .delete(ConversationTable)
    .where(arrayContains(ConversationTable.users, [id]));
  const [user] = await db
    .delete(UserTable)
    .where(eq(UserTable.id, id))
    .returning();
  if (!user) throw GQLError(404, "User not found");
  if (user.instagramDetails)
    try {
      await db
        .delete(InstagramDetails)
        .where(eq(InstagramDetails.id, user.instagramDetails));
    } catch (err) {
      console.error("IN USE", err);
    }
  if (user.location)
    await db.delete(LocationTable).where(eq(LocationTable.id, user.location));
  if (user.photo) await deleteImage(user.photo);

  if (user.emailVerified) {
    await sendTemplateEmail(user.email, "DeleteUser", { name: user.name });
  }
  return true;
}
