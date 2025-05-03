import "reflect-metadata";

import { registerEnumType } from "type-graphql";

export enum SubscriptionPlan {
  Plus = "Plus",
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

export const SUBSCRIPTION_PLANS = [
  {
    plan: SubscriptionPlan.Plus,
    product_id: "pdt_aGhk2wu04TACi0bhmCdaK",
  },
];

registerEnumType(SubscriptionPlan, {
  name: "SubscriptionPlan",
});

registerEnumType(SubscriptionPlanStatus, {
  name: "SubscriptionPlanStatus",
});
