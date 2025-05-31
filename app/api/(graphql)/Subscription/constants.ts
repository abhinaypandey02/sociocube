import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum UsageType {
  AiSearch = "AI_SEARCH",
}
export enum SubscriptionPlan {
  Plus = "Plus",
  Free = "Free",
}
export enum SubscriptionPlanStatus {
  Pending = "pending",
  Active = "active",
  OnHold = "on_hold",
  Paused = "paused",
  Cancelled = "cancelled",
  Failed = "failed",
  Expired = "expired",
}

export const MaxFreeUsages: Record<
  UsageType,
  Record<SubscriptionPlan, number>
> = {
  [UsageType.AiSearch]: {
    [SubscriptionPlan.Plus]: 10,
    [SubscriptionPlan.Free]: 2,
  },
};

export const SUBSCRIPTION_PLANS = [
  {
    plan: SubscriptionPlan.Plus,
    product_id: "pdt_DLAjZNQ6Bang6eLGvZptI",
  },
] as const;
export const USAGE_TYPES = [UsageType.AiSearch] as const;

registerEnumType(SubscriptionPlan, {
  name: "SubscriptionPlan",
});

registerEnumType(SubscriptionPlanStatus, {
  name: "SubscriptionPlanStatus",
});
