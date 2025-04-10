import { ApplicationTable } from "@graphql/Application/db";
import { InstagramDetails } from "@graphql/Instagram/db";
import { InstagramMediaTable } from "@graphql/Instagram/db2";
import { PortfolioTable } from "@graphql/Portfolio/db";
import { RequestTable } from "@graphql/Request/db";
import { ReviewTable } from "@graphql/Review/db";
import { LocationTable, PricingTable, UserTable } from "@graphql/User/db";
import { eq, like } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "../lib/db";
import { deleteImage } from "../lib/storage/aws-s3";

export const GET = async (req: NextRequest) => {
  const email = req.nextUrl.searchParams.get("email");

  const users = await db
    .select()
    .from(UserTable)
    .where(
      email?.startsWith("test") && email.endsWith("@sociocube.com")
        ? eq(UserTable.email, email)
        : like(UserTable.email, "test%@sociocube.com"),
    );
  for (const { id } of users) {
    await db
      .delete(InstagramMediaTable)
      .where(eq(InstagramMediaTable.user, id));
    await db.delete(ReviewTable).where(eq(ReviewTable.user, id));
    await db.delete(PortfolioTable).where(eq(PortfolioTable.user, id));
    await db.delete(ApplicationTable).where(eq(ApplicationTable.user, id));
    await db.delete(RequestTable).where(eq(RequestTable.user, id));
    await db.delete(PricingTable).where(eq(PricingTable.user, id));
    const [user] = await db
      .delete(UserTable)
      .where(eq(UserTable.id, id))
      .returning();
    if (!user) return new NextResponse(null, { status: 404 });
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
  }
  return new NextResponse(
    JSON.stringify({
      status: 200,
      success: true,
      count: users.length,
    }),
    { status: 200 },
  );
};
