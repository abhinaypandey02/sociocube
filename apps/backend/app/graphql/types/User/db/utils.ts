import { eq, SQL } from "drizzle-orm";
import { generateRefreshToken } from "../../../../../lib/auth/token";
import { db } from "../../../../../lib/db";
import { UserDB, UserDBInsert, UserTable } from "./schema";

const MAX_DEVICES = 2;

export async function updateRefreshTokenAndScope(
  id: number,
  refreshTokens: UserDB["refreshTokens"],
  scopes?: UserDB["scopes"],
  data?: UserDBInsert,
) {
  const refreshToken = generateRefreshToken(id);
  await db
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

export async function getUser(filter: SQL) {
  const [user] = await db.select().from(UserTable).where(filter);
  return user;
}

export async function createUser(data: UserDBInsert) {
  const [user] = await db
    .insert(UserTable)
    .values(data)
    .returning({ id: UserTable.id });
  return user;
}
