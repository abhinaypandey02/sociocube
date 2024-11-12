import { and, or, eq, isNotNull } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";

export async function handleGetFeaturedSellers() {
  return db
    .select()
    .from(UserTable)
    .where(
      and(
        or(eq(UserTable.isOnboarded, true), eq(UserTable.isSpirit, true)),
        isNotNull(UserTable.photo),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
      ),
    )
    .limit(8);
}
