import categories from "commons/categories";
import { syncPrices } from "./lib/payment/price";
import { db } from "./lib/db";
import { CategoryTable, UserTable } from "./app/graphql/types/User/db/schema";

export async function register() {
  if (process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_DEVELOPMENT) {
    console.warn("SYNCING PRICES");
    await syncPrices();
  }
  console.warn("SYNCING CATEGORIES");
  await Promise.all(
    categories.map(async (category) =>
      db.insert(CategoryTable).values(category).onConflictDoUpdate({
        target: UserTable.id,
        set: category,
      }),
    ),
  );
}
