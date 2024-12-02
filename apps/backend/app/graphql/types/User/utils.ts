import { eq } from "drizzle-orm";
import { USERNAME_REGEX } from "commons/regex";
import { Context } from "../../context";
import { db } from "../../../../lib/db";
import { OnboardingDataTable, UserTable } from "./db/schema";
import { getUser } from "./db/utils";

export const getCurrentUser = (ctx: Context) => {
  if (!ctx.userId) return null;
  return getUser(eq(UserTable.id, ctx.userId));
};

export function usernameAllowed(username: string) {
  return USERNAME_REGEX.test(username);
}

export async function isUserNameAvailable(username: string) {
  if (!usernameAllowed(username)) return false;
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, username))
    .limit(1);
  if (seller) return false;
  const [onboardingSeller] = await db
    .select()
    .from(OnboardingDataTable)
    .where(eq(OnboardingDataTable.username, username))
    .limit(1);
  return !onboardingSeller;
}
