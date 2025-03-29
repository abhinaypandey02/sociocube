import type { SQL } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { generateRefreshToken } from "../../../../../../lib/auth/token";
import type { DBTransaction } from "../../../../../../lib/db";
import { db } from "../../../../../../lib/db";
import type { UserDB, UserDBInsert } from "./schema";
import { UserTable } from "./schema";

const MAX_DEVICES = 5;

export async function updateRefreshTokenAndScope(
  id: number,
  refreshTokens: UserDB["refreshTokens"],
  data?: Partial<UserDBInsert>,
  tx?: DBTransaction,
) {
  const refreshToken = generateRefreshToken(id);
  await (tx || db)
    .update(UserTable)
    .set({
      refreshTokens: [refreshToken, ...(refreshTokens || [])].slice(
        0,
        MAX_DEVICES,
      ),
      ...(data || {}),
    })
    .where(eq(UserTable.id, id));
  return refreshToken;
}

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
