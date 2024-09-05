import stripe from "./stripe";
import { getPrice } from "./price";
import { createCustomer, getCustomer } from "./customer";

export async function subscriptionCheckout(
  email: string,
  transactionId: string,
  plan: string,
  successUrl: string,
) {
  const price = await getPrice(plan);
  const customer = (await getCustomer(email)) || (await createCustomer(email));
  if (!price || !customer) return null;
  const checkout = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    client_reference_id: transactionId,
    mode: "subscription",
    success_url: successUrl,
  });
  return checkout.url;
}

export async function paymentCheckout(
  product: {
    price: number;
    name: string;
    description?: string;
    images?: string[];
    currency?: string;
  },
  email: string,
  transactionId: string,
  successUrl: string,
  destination?: string,
  serviceFee?: number,
) {
  const customer = (await getCustomer(email)) || (await createCustomer(email));
  if (!customer) return null;
  const checkout = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items: [
      {
        price_data: {
          unit_amount: product.price,
          product_data: {
            name: product.name,
            images: product.images,
            description: product.description,
          },
          currency: product.currency || "USD",
        },
        quantity: 1,
      },
      ...(serviceFee
        ? [
            {
              price_data: {
                unit_amount: product.price * serviceFee * 100,
                product_data: {
                  name: `Service Fee`,
                  description: `We charge a service fee of ${serviceFee * 100}%.`,
                },
                currency: product.currency || "USD",
              },
              quantity: 1,
            },
          ]
        : []),
    ],
    invoice_creation: {
      enabled: true,
    },
    payment_intent_data: {
      receipt_email: email,
      ...(serviceFee
        ? { application_fee_amount: product.price * serviceFee * 100 }
        : {}),
      ...(destination
        ? {
            transfer_data: {
              destination,
              amount: product.price * 100,
            },
          }
        : {}),
    },
    client_reference_id: transactionId,
    mode: "payment",
    success_url: successUrl,
  });
  return checkout.url;
}
