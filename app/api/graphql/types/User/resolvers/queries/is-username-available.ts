import { db } from "@backend/lib/db";
import { AuthorizedContext } from "@graphql/context";
import { and, eq, ne } from "drizzle-orm";

import { UserTable } from "../../db/schema";
import { usernameAllowed } from "../../utils";

export async function handleIsUsernameAvailable(
  ctx: AuthorizedContext,
  username: string,
) {
  if (!usernameAllowed(username)) throw new Error("Username invalid");
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(and(eq(UserTable.username, username), ne(UserTable.id, ctx.userId)))
    .limit(1);
  return !seller;
}
