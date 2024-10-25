import { Field, InputType } from "type-graphql";
import { and, arrayContains, eq, isNotNull } from "drizzle-orm";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import {
  OnboardingDataTable,
  PricingTable,
  UserTable,
} from "../../../db/schema";
import { AuthScopes } from "../../../../../constants/scopes";
import GQLError from "../../../../../constants/errors";

@InputType("UpdatePricingArgs")
export class UpdatePricingArgs {
  @Field()
  general: number;
}
export async function handleUpdateOnboardingPricing(
  args: UpdatePricingArgs,
  ctx: Context,
) {
  if (!ctx.userId) return false;
  const [res] = await db
    .select()
    .from(UserTable)
    .where(
      and(
        eq(UserTable.id, ctx.userId),
        isNotNull(UserTable.onboardingData),
        eq(UserTable.isOnboarded, false),
        arrayContains(UserTable.scopes, [AuthScopes.INSTAGRAM]),
      ),
    )
    .leftJoin(
      OnboardingDataTable,
      eq(UserTable.onboardingData, OnboardingDataTable.id),
    );
  if (!res?.onboarding_data?.city || !res.user.onboardingData)
    throw GQLError(400, "Please add a city to continue");
  if (res.user.pricing) {
    await db
      .update(PricingTable)
      .set({
        general: args.general,
      })
      .where(eq(PricingTable.id, res.user.pricing));
  } else {
    const [pricing] = await db
      .insert(PricingTable)
      .values({ general: args.general })
      .returning({ id: PricingTable.id });
    if (pricing?.id) {
      await db
        .update(OnboardingDataTable)
        .set({ pricing: pricing.id })
        .where(eq(OnboardingDataTable.id, res.user.onboardingData));
    }
  }
  return true;
}
