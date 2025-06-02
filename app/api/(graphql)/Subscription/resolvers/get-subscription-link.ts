import type { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { CityTable, StateTable } from "@graphql/Map/db";
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlanStatus,
} from "@graphql/Subscription/constants";
import { LocationTable, UserTable } from "@graphql/User/db";
import { eq } from "drizzle-orm";

import countries from "@/constants/countries";
import { getRoute } from "@/constants/routes";

import { SubscriptionTable } from "../db";

export async function handleGetSubscriptionLink(ctx: Context) {
  if (!ctx.userId) return null;
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, ctx.userId))
    .leftJoin(SubscriptionTable, eq(SubscriptionTable.user, UserTable.id))
    .leftJoin(LocationTable, eq(LocationTable.id, UserTable.location))
    .leftJoin(CityTable, eq(CityTable.id, LocationTable.city))
    .leftJoin(StateTable, eq(StateTable.id, CityTable.stateId));
  if (!user) return null;
  if (user.subscription?.status === SubscriptionPlanStatus.Active) {
    return user.subscription;
  }
  const productID = SUBSCRIPTION_PLANS[0]?.product_id;
  const city = user.cities?.name;
  const state = user.states?.name;
  const country =
    user.location?.country &&
    countries.find((c) => c.value === user.location?.country)?.label;
  const locationString =
    city && state && country
      ? `city=${city}&state=${state}&country=${country}`
      : undefined;
  return `https://checkout.dodopayments.com/buy/${productID}?metadata_userID=${ctx.userId}&disableEmail=true&fullName=${user.user.name}&email=${user.user.email}${locationString ? `&${locationString}` : ""}&redirect_url=${getRoute("Profile")}`;
}
