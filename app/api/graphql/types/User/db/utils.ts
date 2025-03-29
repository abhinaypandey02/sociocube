import type { SQL } from "drizzle-orm";
import type { DBTransaction } from "@backend/lib/db";
import { db } from "@backend/lib/db";
import type { UserDBInsert } from "./schema";
import { UserTable } from "./schema";

export async function getUser(filter: SQL, tx?: DBTransaction) {
  const [user] = await (tx || db).select().from(UserTable).where(filter);
  return user;
}

export async function createUser(data: UserDBInsert, tx?: DBTransaction) {
  const [user] = await (tx || db)
    .insert(UserTable)
    .values(data)
    .returning({ id: UserTable.id });
  return user;
}
