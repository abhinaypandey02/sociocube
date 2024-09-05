import { eq } from "drizzle-orm";
import { db } from "../db";
import { UserTable } from "../../app/graphql/types/User/db/schema";
import stripe from "./stripe";

export async function getCustomer(email: string) {
  const search = await stripe.customers.search({
    query: `email:${email}`,
    limit: 1,
  });
  return search.data[0];
}

export async function createCustomer(email: string) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, email));
  if (!user) return null;
  return stripe.customers.create({
    email,
    name: user.name || undefined,
    phone: user.phone || undefined,
  });
}
