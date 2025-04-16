import { and, eq, isNotNull, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

import { getRefreshedAccessToken } from "../../(auth)/instagram/utils";
import { InstagramDetails } from "../../(graphql)/Instagram/db";
import { UserTable } from "../../(graphql)/User/db";
import { db } from "../../lib/db";

export const POST = async () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 20);
  const users = await db
    .select()
    .from(UserTable)
    .innerJoin(
      InstagramDetails,
      and(
        eq(InstagramDetails.id, UserTable.instagramDetails),
        isNotNull(InstagramDetails.accessToken),
        lte(InstagramDetails.accessTokenUpdatedAt, currentDate),
      ),
    );
  for (const user of users) {
    const token = user.instagram_data.accessToken;
    if (token) {
      const refreshedToken = await getRefreshedAccessToken(token);
      if (refreshedToken) {
        await db
          .update(InstagramDetails)
          .set({
            accessToken: refreshedToken,
            accessTokenUpdatedAt: new Date(),
          })
          .where(eq(InstagramDetails.id, user.instagram_data.id));
        console.warn("UPDATED", user.user.name);
      } else {
        await db
          .update(InstagramDetails)
          .set({
            accessToken: null,
          })
          .where(eq(InstagramDetails.id, user.instagram_data.id));
        console.warn("NO TOKEN FOR ", user.user.username);
      }
    }
  }

  return new NextResponse(null, { status: 200 });
};
