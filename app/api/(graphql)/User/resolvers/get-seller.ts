import { Roles } from "@backend/lib/constants/roles";
import { db } from "@backend/lib/db";
import { and, eq, isNotNull, ne, or } from "drizzle-orm";

import { UserTable } from "../db";

export async function handleGetSeller(username: string) {
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(
      and(
        eq(UserTable.username, username),
        isNotNull(UserTable.name),
        isNotNull(UserTable.photo),
        isNotNull(UserTable.location),
        or(
          ne(UserTable.role, Roles.Creator),
          and(
            isNotNull(UserTable.category),
            isNotNull(UserTable.gender),
            isNotNull(UserTable.dob),
            isNotNull(UserTable.instagramDetails),
          ),
        ),
      ),
    )
    .limit(1);
  return seller;
}
