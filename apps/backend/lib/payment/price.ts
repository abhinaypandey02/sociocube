import stripe from "./stripe";
import { Prices } from "./constants";

export async function getPrice(key: string) {
  if (!Prices.some((price) => price.lookup_key === key)) return undefined;
  const search = await stripe.prices.search({
    query: `lookup_key:${key}`,
    limit: 1,
  });
  return search.data[0];
}

export async function syncPrices() {
  await Promise.all(
    Prices.map(async (price) => {
      const search = await stripe.prices.search({
        query: `lookup_key:'${price.lookup_key}'`,
        limit: 1,
      });
      if (search.data.length === 0) await stripe.prices.create(price);
    }),
  );
}
