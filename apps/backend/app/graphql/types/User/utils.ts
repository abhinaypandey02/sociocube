import { eq } from "drizzle-orm";
import { USERNAME_REGEX } from "commons/regex";
import { Context } from "../../context";
import { UserTable } from "./db/schema";
import { getUser } from "./db/utils";

export const getCurrentUser = (ctx: Context) => {
  if (!ctx.userId) return null;
  return getUser(eq(UserTable.id, ctx.userId));
};

export function usernameAllowed(username: string) {
  return USERNAME_REGEX.test(username);
}
