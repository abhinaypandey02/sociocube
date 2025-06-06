import "reflect-metadata";

import { registerEnumType } from "type-graphql";

import { SubscriptionPlan, UsageType } from "@/lib/usages";

export enum SubscriptionPlanStatus {
  Pending = "pending",
  Active = "active",
  OnHold = "on_hold",
  Paused = "paused",
  Cancelled = "cancelled",
  Failed = "failed",
  Expired = "expired",
}

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
