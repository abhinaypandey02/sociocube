import { eq } from "drizzle-orm";
import { db } from "../../../../../lib/db";
import { UserTable } from "../../db/schema";
import { usernameAllowed } from "../../utils";

export async function handleIsUsernameAvailable(username: string) {
  if (!usernameAllowed(username)) throw new Error("Username invalid");
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, username))
    .limit(1);
  return !seller;
}
