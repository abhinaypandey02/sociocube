import { db } from "@backend/lib/db";
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlanStatus,
} from "@graphql/Subscription/constants";
import { SubscriptionTable } from "@graphql/Subscription/db";
import DodoPayments from "dodopayments";
import { NextRequest, NextResponse } from "next/server";
import { Webhook, WebhookUnbrandedRequiredHeaders } from "standardwebhooks";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY || "");
const client = new DodoPayments({
  apiKey: process.env.DODO_PAYMENTS_API_KEY || "", // This is the default and can be omitted
});

export const POST = async (req: NextRequest) => {
  const raw = await req.text();

  const webhookHeaders: WebhookUnbrandedRequiredHeaders = {
    "webhook-id": (req.headers.get("webhook-id") || "") as string,
    "webhook-signature": (req.headers.get("webhook-signature") || "") as string,
    "webhook-timestamp": (req.headers.get("webhook-timestamp") || "") as string,
  };

  const { data } = (await webhook.verify(raw, webhookHeaders)) as {
    data: {
      next_billing_date: string;
      status: SubscriptionPlanStatus;
      subscription_id: string;
      product_id: string;
      payment_id: string;
      payload_type: "Subscription" | "Payment";
      metadata: {
        userID?: string;
      };
    };
  };

  if (!data.metadata.userID) {
    if (data.payment_id) {
      await client.refunds.create({
        payment_id: data.payment_id,
      });
    }
    return new NextResponse(JSON.stringify({ refunded: !!data.payment_id }), {
      status: 400,
    });
  }

  if (data.payload_type === "Subscription") {
    const subscriptionData = {
      subscriptionID: data.subscription_id,
      nextBilling: new Date(data.next_billing_date),
      user: parseInt(data.metadata.userID),
      status: data.status,
      plan: SUBSCRIPTION_PLANS.find(
        (plan) => plan.product_id === data.product_id,
      )?.plan,
    };

    await db
      .insert(SubscriptionTable)
      .values(subscriptionData)
      .onConflictDoUpdate({
        target: SubscriptionTable.subscriptionID,
        set: subscriptionData,
      });
  }
  return NextResponse.json({ received: true });
};
