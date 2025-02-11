import { and, eq, isNotNull, or } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import { AgencyTable } from "../../../Agency/db/schema";

export async function handleGetSeller(username: string) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(
      and(
        or(isNotNull(UserTable.instagramDetails)),
        eq(UserTable.username, username),
      ),
    )
    .limit(1);
  if (user)
    return {
      user,
      agency: null,
    };
  const [agency] = await db
    .select()
    .from(AgencyTable)
    .where(
      and(
        or(isNotNull(AgencyTable.instagramDetails)),
        eq(AgencyTable.username, username),
      ),
    )
    .limit(1);
  return {
    agency,
    user: null,
  };
}
