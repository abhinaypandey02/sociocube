import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum UsageType {
  AiSearch = "AiSearch",
  PostingAnnouncement = "PostingAnnouncement",
  GlobalAnnouncement = "GlobalAnnouncement",
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

export type MaxUsage = Record<SubscriptionPlan, number>;

export const MaxUsages: Record<UsageType, MaxUsage> = {
  [UsageType.AiSearch]: {
    [SubscriptionPlan.Plus]: 10,
    [SubscriptionPlan.Free]: 2,
  },
  [UsageType.PostingAnnouncement]: {
    [SubscriptionPlan.Plus]: 3,
    [SubscriptionPlan.Free]: 1,
  },
  [UsageType.GlobalAnnouncement]: {
    [SubscriptionPlan.Plus]: 10,
    [SubscriptionPlan.Free]: 1,
  },
};

export const SUBSCRIPTION_PLANS = [
  {
    plan: SubscriptionPlan.Plus,
    product_id: "pdt_DLAjZNQ6Bang6eLGvZptI",
  },
] as const;
export const USAGE_TYPES = [
  UsageType.AiSearch,
  UsageType.PostingAnnouncement,
  UsageType.GlobalAnnouncement,
] as const;

registerEnumType(SubscriptionPlan, {
  name: "SubscriptionPlan",
});

registerEnumType(SubscriptionPlanStatus, {
  name: "SubscriptionPlanStatus",
});
