import { Field, InputType } from "type-graphql";
import { and, arrayContains, eq, isNotNull } from "drizzle-orm";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../../db/schema";
import { AuthScopes } from "../../../../../constants/scopes";
import GQLError from "../../../../../constants/errors";

@InputType("UpdateLocationArgs")
export class UpdateLocationArgs {
  @Field()
  city: number;
}
export async function handleUpdateOnboardingLocation(
  args: UpdateLocationArgs,
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
  if (
    !res?.user.onboardingData ||
    !res.onboarding_data?.name ||
    !res.onboarding_data.bio ||
    !res.onboarding_data.dob ||
    !res.onboarding_data.gender ||
    !res.onboarding_data.category
  )
    throw GQLError(400, "Please add basic details to continue");
  await db
    .update(OnboardingDataTable)
    .set({
      city: args.city,
    })
    .where(eq(OnboardingDataTable.id, res.user.onboardingData));
  return true;
}
