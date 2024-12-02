import { eq } from "drizzle-orm";
import { PricingTable, UserDB } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { Pricing } from "../../type";

export async function getPricing(user: UserDB) {
  if (user.pricing) {
    const [pricing] = await db
      .select()
      .from(PricingTable)
      .where(eq(PricingTable.id, user.pricing));
    if (pricing) return pricing as Pricing;
  }
  return null;
}
