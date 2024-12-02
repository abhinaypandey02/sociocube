import { Field, InputType } from "type-graphql";
import { and, arrayContains, eq, isNotNull } from "drizzle-orm";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../../db/schema";
import { AuthScopes } from "../../../../../constants/scopes";
import GQLError from "../../../../../constants/errors";
import { Currency } from "../../../type";
import { CountryTable } from "../../../../Map/db/schema";

@InputType("UpdateLocationArgs")
export class UpdateLocationArgs {
  @Field({ nullable: true })
  city?: number;
  @Field()
  state: number;
  @Field()
  country: number;
}
export async function handleUpdateOnboardingLocation(
  args: UpdateLocationArgs,
  ctx: Context,
): Promise<Currency> {
  if (!ctx.userId) throw GQLError(403);
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
    !res.onboarding_data.gender ||
    !res.onboarding_data.username ||
    !res.onboarding_data.category
  )
    throw GQLError(400, "Please add basic details to continue");
  await db
    .update(OnboardingDataTable)
    .set({
      city: args.city,
      country: args.country,
      state: args.state,
    })
    .where(eq(OnboardingDataTable.id, res.user.onboardingData));
  const [cityData] = await db
    .select()
    .from(CountryTable)
    .where(eq(CountryTable.id, args.country));
  if (cityData)
    return {
      name: cityData.currencyName || undefined,
      symbol: cityData.currencySymbol || undefined,
    };
  throw GQLError(500, "Can't update DB");
}
