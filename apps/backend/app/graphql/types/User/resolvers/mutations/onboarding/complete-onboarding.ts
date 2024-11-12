import { and, arrayContains, eq, isNotNull } from "drizzle-orm";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import {
  LocationTable,
  OnboardingDataTable,
  UserTable,
} from "../../../db/schema";
import GQLError from "../../../../../constants/errors";
import { AuthScopes } from "../../../../../constants/scopes";
import { Roles } from "../../../../../constants/roles";

export async function handleCompleteOnboarding(ctx: Context) {
  await db.transaction(async (tx) => {
    if (!ctx.userId) return false;
    const [res] = await tx
      .select()
      .from(UserTable)
      .where(
        and(
          eq(UserTable.id, ctx.userId),
          isNotNull(UserTable.onboardingData),
          isNotNull(UserTable.instagramDetails),
          eq(UserTable.isOnboarded, false),
          arrayContains(UserTable.scopes, [AuthScopes.INSTAGRAM]),
        ),
      )
      .leftJoin(
        OnboardingDataTable,
        eq(UserTable.onboardingData, OnboardingDataTable.id),
      );
    if (!res?.onboarding_data || !res.user.onboardingData)
      throw GQLError(400, "Already onboarded or onboarding not started");
    if (
      !res.onboarding_data.name ||
      !res.onboarding_data.bio ||
      !res.onboarding_data.dob ||
      !res.onboarding_data.gender ||
      !res.onboarding_data.city ||
      !res.onboarding_data.country ||
      !res.onboarding_data.state ||
      !res.onboarding_data.category
    )
      throw GQLError(400, "Missing required fields");
    const { city, state, country } = res.onboarding_data;
    const [location] = await tx
      .insert(LocationTable)
      .values({
        state,
        city,
        country,
      })
      .returning();
    if (!location?.id) {
      tx.rollback();
      throw GQLError(500, "Failed to create location");
    }
    const [updateResult] = await tx
      .update(UserTable)
      .set({
        ...res.onboarding_data,
        id: ctx.userId,
        onboardingData: null,
        roles: [...res.user.roles, Roles.SELLER],
        isOnboarded: true,
        location: location.id,
      })
      .where(eq(UserTable.id, ctx.userId))
      .returning({ isOnboarded: UserTable.isOnboarded });
    if (!updateResult?.isOnboarded) {
      tx.rollback();
      return;
    }
    await tx
      .delete(OnboardingDataTable)
      .where(eq(OnboardingDataTable.id, res.user.onboardingData));
  });
  return true;
}
