import { getUserIdFromRefreshToken } from "@backend/lib/auth/token";
import { UserTable } from "@graphql/User/db";
import { getUser } from "@graphql/User/utils";
import { eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import type { AuthChecker } from "type-graphql";

export interface Context {
  userId: number | null;
  onlyQuery?: boolean;
}
export interface AuthorizedContext {
  userId: number;
  onlyQuery?: boolean;
}

export async function context(req: NextRequest): Promise<Context> {
  const bearer = req.headers.get("authorization");
  if (!bearer) {
    const refresh = req.cookies.get("refresh")?.value;
    const userId = getUserIdFromRefreshToken(refresh);
    if (userId) return { userId, onlyQuery: true };
  } else if (process.env.SIGNING_KEY) {
    const token = bearer.slice(7);
    try {
      const res = verify(token, process.env.SIGNING_KEY);
      console.warn({
        userId: typeof res !== "string" ? (res.id as number) : null,
      });
      return { userId: typeof res !== "string" ? (res.id as number) : null };
    } catch {
      return { userId: null };
    }
  }
  return { userId: null };
}

export const authChecker: AuthChecker<Context> = async (
  { context: ctx },
  roles,
) => {
  if (!ctx.userId) return false;
  if (roles.length === 0) return true;
  const user = await getUser(eq(UserTable.id, ctx.userId));
  return Boolean(user?.role && roles.includes(user.role));
};
