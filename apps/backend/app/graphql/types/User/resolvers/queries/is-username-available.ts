import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import { usernameAllowed } from "../../utils";
import { AgencyOnboardingTable, AgencyTable } from "../../../Agency/db/schema";

export async function handleIsUsernameAvailable(username: string) {
  if (!usernameAllowed(username)) throw new Error("Username invalid");
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, username))
    .limit(1);
  const [agency] = await db
    .select()
    .from(AgencyTable)
    .where(eq(AgencyTable.username, username))
    .limit(1);
  if (seller || agency) return false;
  const [onboardingAgency] = await db
    .select()
    .from(AgencyOnboardingTable)
    .where(eq(AgencyOnboardingTable.username, username))
    .limit(1);
  return !onboardingAgency;
}
