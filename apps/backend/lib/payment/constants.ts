import { Stripe } from "stripe";

export const Prices: Stripe.PriceCreateParams[] = [
  {
    lookup_key: "0" as const,
    currency: "USD",
    unit_amount: 100,
    recurring: {
      interval: "month" as const,
    },
    product_data: {
      name: "Gold Plan",
    },
  },
];

export const SERVICE_FEE = 0.05;
