import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum SubscriptionPlan {
  Plus = "Plus",
}

export const FREE_SEARCH_LIMIT = 2;

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
];

registerEnumType(SubscriptionPlan, {
  name: "SubscriptionPlan",
});

registerEnumType(SubscriptionPlanStatus, {
  name: "SubscriptionPlanStatus",
});
