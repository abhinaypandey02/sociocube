import {eq} from "drizzle-orm";
import {PricingTable, UserDB} from "../../db/schema";
import {db} from "../../../../../../lib/db";

export async function getPricing(user: UserDB) {
  const [pricing] = await db
    .select()
    .from(PricingTable)
    .where(eq(PricingTable.user, user.id));
  return pricing;
}
