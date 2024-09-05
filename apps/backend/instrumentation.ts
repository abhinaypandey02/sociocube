import { syncPrices } from "./lib/payment/price";

export async function register() {
  console.warn("SYNCING PRICES");
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("STRIPE_SECRET_KEY not found, skipping");
    return;
  }
  await syncPrices();
}
