import { syncPrices } from "./lib/payment/price";

export async function register() {
  if (!process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_DEVELOPMENT) {
    return;
  }
  console.warn("SYNCING PRICES");
  await syncPrices();
}
