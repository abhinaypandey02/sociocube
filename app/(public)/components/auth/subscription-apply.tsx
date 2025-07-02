"use client";
import { useEffect } from "react";

import { GetSubscriptionQuery } from "@/__generated__/graphql";
import { useSubscription } from "@/state/hooks";

export default function SubscriptionApply({
  data,
}: {
  data?: GetSubscriptionQuery;
}) {
  const [, setSubscription] = useSubscription();
  useEffect(() => {
    if (data)
      setSubscription({
        existing: data.getSubscription,
        link: data.getSubscriptionLink,
      });
  }, [data, setSubscription]);
  return null;
}
