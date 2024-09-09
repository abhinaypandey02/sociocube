import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";

export async function handleGetFeaturedSellers() {
  return db
    .select()
    .from(UserTable)
    .where(eq(UserTable.isOnboarded, true))
    .limit(8);
}
