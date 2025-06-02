import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { UserTable } from "../db";

export async function handleGetSeller(username: string) {
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, username))
    .limit(1);
  return seller;
}
