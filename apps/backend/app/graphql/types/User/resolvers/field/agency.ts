import { eq } from "drizzle-orm";
import { UserDB } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { AgencyMember, AgencyOnboardingTable } from "../../../Agency/db/schema";

export async function getOnboardingAgency(user: UserDB) {
  const [data] = await db
    .select()
    .from(AgencyOnboardingTable)
    .where(eq(AgencyOnboardingTable.user, user.id));
  return data;
}

export async function getAgencies(user: UserDB) {
  return db.select().from(AgencyMember).where(eq(AgencyMember.user, user.id));
}
