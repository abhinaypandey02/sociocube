import { and, eq, isNotNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import {
  LocationTable,
  OnboardingDataTable,
  UserTable,
} from "../../../db/schema";
import GQLError from "../../../../../constants/errors";
import { Roles } from "../../../../../constants/roles";

export async function handleCompleteOnboarding(ctx: AuthorizedContext) {
  await db.transaction(async (tx) => {
    const [res] = await tx
      .select()
      .from(UserTable)
      .where(
        and(
          eq(UserTable.id, ctx.userId),
          isNotNull(UserTable.onboardingData),
          isNotNull(UserTable.instagramDetails),
          eq(UserTable.isOnboarded, false),
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
      !res.onboarding_data.gender ||
      !res.onboarding_data.city ||
      !res.onboarding_data.country ||
      !res.onboarding_data.state ||
      !res.onboarding_data.username ||
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
        username: res.onboarding_data.username,
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
