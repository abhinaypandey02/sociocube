import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import type { UserDB } from "../../db/schema";
import { PricingTable } from "../../db/schema";

export async function getPricing(user: UserDB) {
  const [pricing] = await db
    .select()
    .from(PricingTable)
    .where(eq(PricingTable.user, user.id));
  return pricing;
}
