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
import { eq, inArray } from "drizzle-orm";

import { SubscriptionTable, UsageTable } from "../../Subscription/db";
import { LocationTable, PricingTable, UserTable } from "../db";

export async function deleteUser(ctx: AuthorizedContext): Promise<boolean> {
  if (!ctx.userId) throw GQLError(403);

  const id = ctx.userId;
  await db.delete(UsageTable).where(eq(UsageTable.user, id));
  await db.delete(SubscriptionTable).where(eq(SubscriptionTable.user, id));
  await db.delete(InstagramMediaTable).where(eq(InstagramMediaTable.user, id));
  const postings = await db
    .select({ id: PostingTable.id })
    .from(PostingTable)
    .where(eq(PostingTable.agency, id));
  if (postings.length)
    await db.delete(ApplicationTable).where(
      inArray(
        ApplicationTable.posting,
        postings.map((p) => p.id),
      ),
    );
  await db.delete(PostingTable).where(eq(PostingTable.agency, id));
  await db.delete(ReviewTable).where(eq(ReviewTable.user, id));
  await db.delete(ReviewTable).where(eq(ReviewTable.agency, id));
  await db.delete(PortfolioTable).where(eq(PortfolioTable.user, id));
  await db.delete(PortfolioTable).where(eq(PortfolioTable.agency, id));
  await db.delete(ApplicationTable).where(eq(ApplicationTable.user, id));
  await db.delete(RequestTable).where(eq(RequestTable.user, id));
  await db.delete(PricingTable).where(eq(PricingTable.user, id));
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
  return true;
}
