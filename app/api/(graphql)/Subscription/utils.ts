import { db } from "@backend/lib/db";
import { UsageTable } from "@graphql/Subscription/db";
import { waitUntil } from "@vercel/functions";
import { and, count, eq, gt } from "drizzle-orm";

import { MaxUsage, MaxUsages, SubscriptionPlan, UsageType } from "@/lib/usages";

export async function getPendingUsage({
  userID,
  feature,
  plan,
  thresholdHours,
  thresholdUsage,
  key,
}: {
  userID: number;
  feature: UsageType;
  plan?: SubscriptionPlan | null;
  thresholdHours?: number;
  thresholdUsage?: MaxUsage;
  key?: number;
}) {
  const hoursThreshold = thresholdHours ?? 24;
  const last24Hours = new Date();
  last24Hours.setHours(last24Hours.getHours() - (hoursThreshold || 0));

  const allowedUsage = (thresholdUsage ?? MaxUsages[UsageType.AiSearch])[
    plan || SubscriptionPlan.Free
  ];

  const [usage] = await db
    .select({ count: count(UsageTable.id) })
    .from(UsageTable)
    .where(
      and(
        eq(UsageTable.user, userID),
        eq(UsageTable.type, feature),
        hoursThreshold ? gt(UsageTable.createdAt, last24Hours) : undefined,
        key ? eq(UsageTable.entityKey, key) : undefined,
      ),
    );

  return allowedUsage - (usage?.count || 0);
}

export function addUsage({
  userID,
  feature,
  key,
}: {
  userID: number;
  feature: UsageType;
  key?: number;
}) {
  waitUntil(
    (async () => {
      await db.insert(UsageTable).values({
        user: userID,
        entityKey: key,
        type: feature,
      });
    })(),
  );
}
