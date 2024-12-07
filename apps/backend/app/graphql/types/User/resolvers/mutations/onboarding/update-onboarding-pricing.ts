import { Field, InputType } from "type-graphql";
import { and, arrayContains, eq, isNotNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import {
  OnboardingDataTable,
  PricingTable,
  UserTable,
} from "../../../db/schema";
import { AuthScopes } from "../../../../../constants/scopes";
import GQLError from "../../../../../constants/errors";

@InputType("OnboardingPriceInput")
export class OnboardingPriceInput {
  @Field()
  starting: number;
}
export async function handleUpdateOnboardingPricing(
  ctx: AuthorizedContext,
  { starting }: OnboardingPriceInput,
) {
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
  if (res.onboarding_data.pricing) {
    await db
      .update(PricingTable)
      .set({
        starting,
      })
      .where(eq(PricingTable.id, res.onboarding_data.pricing));
  } else {
    const [pricing] = await db
      .insert(PricingTable)
      .values({ starting })
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
