import React from "react";

import { GetSubscriptionQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";

import AccountCard from "./account-card";
export default function PlanSection({ data }: { data?: GetSubscriptionQuery }) {
  const subscription = data?.getSubscription;
  if (!subscription) return null;
  return (
    <AccountCard
      title="Instagram Stats"
      subtitle="These are just estimates and not official data."
    >
      {subscription.link && (
        <a href={subscription.link}>
          <Button>Upgrade</Button>
        </a>
      )}
    </AccountCard>
  );
}
