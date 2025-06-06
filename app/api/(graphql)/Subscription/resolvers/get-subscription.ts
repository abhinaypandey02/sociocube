import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { SubscriptionDB, SubscriptionTable } from "../db";

const DEFAULT_SUBSCRIPTION: SubscriptionDB = {
  subscriptionID: null,
  plan: null,
  nextBilling: null,
  user: -1,
  status: null,
};

export async function handleGetSubscription(ctx: Context) {
  if (!ctx.userId) return DEFAULT_SUBSCRIPTION;
  const [subscription] = await db
    .select()
    .from(SubscriptionTable)
    .where(eq(SubscriptionTable.user, ctx.userId));
  return subscription || DEFAULT_SUBSCRIPTION;
}
