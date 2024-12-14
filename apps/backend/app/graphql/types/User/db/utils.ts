import { eq, SQL } from "drizzle-orm";
import { generateRefreshToken } from "../../../../../lib/auth/token";
import { db, DBTransaction } from "../../../../../lib/db";
import { UserDB, UserDBInsert, UserTable } from "./schema";

const MAX_DEVICES = 2;

export async function updateRefreshTokenAndScope(
  id: number,
  refreshTokens: UserDB["refreshTokens"],
  scopes?: UserDB["scopes"],
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
      ...(scopes ? { scopes } : {}),
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
  if (user)
    await (tx || db)
      .update(UserTable)
      .set({ username: user.id.toString() })
      .where(eq(UserTable.id, user.id));
  return user;
}
