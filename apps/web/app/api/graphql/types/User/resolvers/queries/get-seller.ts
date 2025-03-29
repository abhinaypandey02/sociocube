import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../../../../../lib/db";
import { UserTable } from "../../db/schema";

export async function handleGetSeller(username: string) {
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(
      and(
        isNotNull(UserTable.instagramDetails),
        eq(UserTable.username, username),
      ),
    )
    .limit(1);
  return seller;
}
