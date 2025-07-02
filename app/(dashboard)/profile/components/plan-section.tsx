"use client";
import React from "react";

import { SubscriptionPlanStatus } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { useOpenPopup, useSubscription } from "@/state/hooks";

import AccountCard from "./account-card";

export default function PlanSection() {
  const [sub] = useSubscription();
  const toggleSubModal = useOpenPopup("GET_SUBSCRIPTION");

  return (
    <AccountCard
      title="Subscriptions"
      subtitle="Manage your billing and subscriptions."
    >
      {sub?.existing?.status !== SubscriptionPlanStatus.Active && (
        <Button onClick={() => toggleSubModal("Get Sociocube today")}>
          Get Sociocube+
        </Button>
      )}
    </AccountCard>
  );
}
