import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";

export async function handleGetFeaturedSellers() {
  return db
    .select()
    .from(UserTable)
    .where(
      and(
        eq(UserTable.isOnboarded, true),
        isNotNull(UserTable.bio),
        isNotNull(UserTable.photo),
      ),
    )
    .limit(8);
}
