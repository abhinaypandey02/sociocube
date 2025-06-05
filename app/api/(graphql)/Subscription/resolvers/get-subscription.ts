import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";

import { SubscriptionTable } from "../db";

export async function handleGetSubscription(ctx: Context) {
  if (!ctx.userId) return null;
  const [subscription] = await db
    .select()
    .from(SubscriptionTable)
    .where(eq(SubscriptionTable.user, ctx.userId));
  return (
    subscription || {
      subscriptionID: null,
      plan: null,
      nextBilling: null,
      user: ctx.userId,
      status: null,
    }
  );
}
