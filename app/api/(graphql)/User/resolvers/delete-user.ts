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
import { compare } from "bcryptjs";
import { arrayContains, eq, inArray } from "drizzle-orm";

import { Roles } from "@/app/api/lib/constants/roles";
import { sendTemplateEmail } from "@/app/api/lib/email/send-template";

import { ConversationMessageTable, ConversationTable } from "../../Chat/db";
import { LocationTable, PricingTable, UserTable } from "../db";

export async function deleteUser(
  ctx: AuthorizedContext,
  password: string,
): Promise<boolean> {
  if (!ctx.userId) throw GQLError(403);
  const [existingUser] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, ctx.userId));
  if (!existingUser) throw GQLError(403);
  if (existingUser.password) {
    if (!(await compare(password, existingUser.password)))
      throw GQLError(403, "Incorrect password");
  }

  const id = ctx.userId;
  const [userRole] = await db
    .select({ role: UserTable.role })
    .from(UserTable)
    .where(eq(UserTable.id, id));
  await db.delete(InstagramMediaTable).where(eq(InstagramMediaTable.user, id));
  if (userRole?.role === Roles.Agency || userRole?.role === Roles.Brand) {
    await db
      .delete(ApplicationTable)
      .where(
        inArray(
          ApplicationTable.posting,
          db
            .select({ id: PostingTable.id })
            .from(PostingTable)
            .where(eq(PostingTable.agency, id)),
        ),
      );
  }
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
  await db.delete(UserTable).where(eq(UserTable.id, id)).returning();
  if (existingUser.instagramDetails)
    try {
      await db
        .delete(InstagramDetails)
        .where(eq(InstagramDetails.id, existingUser.instagramDetails));
    } catch (err) {
      console.error("IN USE", err);
    }
  if (existingUser.location)
    await db
      .delete(LocationTable)
      .where(eq(LocationTable.id, existingUser.location));
  if (existingUser.photo) await deleteImage(existingUser.photo);
  if (existingUser.emailVerified) {
    await sendTemplateEmail(existingUser.email, "DeleteUser", {
      name: existingUser.name,
    });
  }
  return true;
}
