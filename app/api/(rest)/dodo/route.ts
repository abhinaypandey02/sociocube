import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlanStatus,
} from "@backend/lib/constants/plans";
import { db } from "@backend/lib/db";
import { SubscriptionTable } from "@graphql/User/db";
import { NextRequest, NextResponse } from "next/server";
import { Webhook, WebhookUnbrandedRequiredHeaders } from "standardwebhooks";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY || "");

export const POST = async (req: NextRequest) => {
  const body = req.body;

  const webhookHeaders: WebhookUnbrandedRequiredHeaders = {
    "webhook-id": (req.headers.get("webhook-id") || "") as string,
    "webhook-signature": (req.headers.get("webhook-signature") || "") as string,
    "webhook-timestamp": (req.headers.get("webhook-timestamp") || "") as string,
  };

  const raw = JSON.stringify(body);

  const { data } = (await webhook.verify(raw, webhookHeaders)) as {
    data: {
      next_billing_date: string;
      status: SubscriptionPlanStatus;
      subscription_id: string;
      product_id: string;
      metadata: {
        userID: string;
      };
    };
  };
  console.warn(data);
  const subscriptionData = {
    subscriptionID: data.subscription_id,
    nextBilling: new Date(data.next_billing_date),
    user: parseInt(data.metadata.userID),
    status: data.status,
    plan: SUBSCRIPTION_PLANS.find((plan) => plan.product_id === data.product_id)
      ?.plan,
  };

  await db
    .insert(SubscriptionTable)
    .values(subscriptionData)
    .onConflictDoUpdate({
      target: SubscriptionTable.subscriptionID,
      set: subscriptionData,
    });
  return NextResponse.json({ received: true });
};
