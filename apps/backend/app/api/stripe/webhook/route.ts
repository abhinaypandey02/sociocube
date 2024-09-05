import type { NextRequest } from "next/server";
import stripe from "../../../../lib/payment/stripe";

export async function POST(req: NextRequest) {
  const payload = await req.text();

  const sig = req.headers.get("payment-signature");
  if (!sig) {
    return new Response("no payment signature", {
      status: 400,
    });
  }
  let event;
  const endpointSecret = process.env.WEBHOOK_SECRET || "";
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error as Error), {
      status: 500,
    });
  }
  // eslint-disable-next-line -- Too many cases to cover
  switch (event.type) {
    case "checkout.session.completed": {
      // const session = event.data.object;
      // Mark the booking as active and send emails
      break;
    }
    case "customer.subscription.created": {
      // const subscription = event.data.object;
      // Set user.stripeSubscriptionID
      break;
    }
    case "customer.subscription.deleted": {
      // const subscription = event.data.object;
      // Delete user.stripeSubscriptionID
      break;
    }
    case "account.updated": {
      // const account = event.data.object;
      // Set user.stripeConnectedAccountID
      break;
    }
  }
  return new Response("payment confirmation route received", {
    status: 200,
  });
}
