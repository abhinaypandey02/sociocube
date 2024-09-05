import { eq } from "drizzle-orm";
import { db } from "../db";
import { UserTable } from "../../app/graphql/types/User/db/schema";
import stripe from "./stripe";

export async function getConnectAccount(email: string) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, email));
  if (!user) return null;
  if (user.stripeConnectedAccountID) {
    return stripe.accounts.retrieve(user.stripeConnectedAccountID);
  }
  return stripe.accounts.create({
    email,
    type: "express",
  });
}

export async function getConnectURL(email: string, returnURL: string) {
  const account = await getConnectAccount(email);
  if (!account) return null;
  if (account.details_submitted) {
    const { url } = await stripe.accounts.createLoginLink(account.id);
    return url;
  }
  const { url } = await stripe.accountLinks.create({
    account: account.id,
    type: "account_onboarding",
    return_url: returnURL,
  });
  return url;
}
