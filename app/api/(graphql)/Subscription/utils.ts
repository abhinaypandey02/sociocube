import { db } from "@backend/lib/db";
import { SubscriptionTable } from "@graphql/Subscription/db";
import {
  MaxUsage,
  MaxUsages,
  SubscriptionPlan,
  UsageType,
  SubscriptionPlanStatus,
} from "@graphql/Subscription/constants";
import { UsageTable } from "@graphql/Subscription/db";
import { and, count, eq, gt } from "drizzle-orm";

export async function getPendingUsage({
  userID,
  feature,
  thresholdHours,
  thresholdUsage,
  key,
}: {
  userID: number;
  feature: UsageType;
  thresholdHours?: number;
  thresholdUsage?: MaxUsage;
  key?: number;
}) {
  const hoursThreshold = thresholdHours ?? 24;
  const last24Hours = new Date();
  last24Hours.setHours(last24Hours.getHours() - (hoursThreshold || 0));

  const plan = await getPlan(userID);
  const allowedUsage = (thresholdUsage ?? MaxUsages[feature])[
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

export async function addUsage({
  userID,
  feature,
  key,
}: {
  userID: number;
  feature: UsageType;
  key?: number;
}) {
    await db.insert(UsageTable).values({
      user: userID,
      entityKey: key,
      type: feature,
    });
}

export async function getPlan(userID: number){
  const [plan] = await db
    .select()
    .from(SubscriptionTable)
    .where(eq(SubscriptionTable.user, userID));
  
  if(!plan || !plan.status || plan.status==SubscriptionPlanStatus.Expired || plan.status==SubscriptionPlanStatus.Failed || plan.status==SubscriptionPlanStatus.Pending) 
    return null;

  return SubscriptionPlan.Plus;
}