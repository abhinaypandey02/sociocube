import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { eq } from "drizzle-orm";
import { getUser } from "./types/User/db/utils";
import { UserTable } from "./types/User/db/schema";

export interface Context {
  userId: number | null;
}

export function context(req: NextRequest): Context {
  const bearer = req.headers.get("authorization");
  if (bearer && process.env.SIGNING_KEY) {
    const token = bearer.slice(7);
    try {
      const res = verify(token, process.env.SIGNING_KEY);
      return { userId: typeof res !== "string" ? (res.id as number) : null };
    } catch (e) {
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
  return Boolean(user?.roles.some((role) => roles.includes(role)));
};
