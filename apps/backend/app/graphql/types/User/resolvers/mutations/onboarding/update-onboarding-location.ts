import { Field, InputType } from "type-graphql";
import { and, eq, isNotNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { LocationTable, UserTable } from "../../../db/schema";
import GQLError from "../../../../../constants/errors";
import { Currency } from "../../../type";
import { CountryTable } from "../../../../Map/db/schema";

@InputType("OnboardingLocationInput")
export class OnboardingLocationInput {
  @Field({ nullable: true })
  city?: number;
  @Field()
  state: number;
  @Field()
  country: number;
}
export async function handleUpdateOnboardingLocation(
  ctx: AuthorizedContext,
  { city, country, state }: OnboardingLocationInput,
): Promise<Currency> {
  const [res] = await db
    .select()
    .from(UserTable)
    .where(
      and(
        eq(UserTable.id, ctx.userId),
        eq(UserTable.isOnboarded, false),
        isNotNull(UserTable.instagramDetails),
      ),
    );
  if (!res?.name || !res.bio || !res.gender || !res.username || !res.category)
    throw GQLError(400, "Please add basic details to continue");
  const [location] = await db
    .insert(LocationTable)
    .values({
      city,
      country,
      state,
    })
    .returning({ id: LocationTable.id });
  if (!location) throw GQLError(400, "Error creating location");
  await db.update(UserTable).set({
    location: location.id,
  });
  const [cityData] = await db
    .select()
    .from(CountryTable)
    .where(eq(CountryTable.id, country));
  if (cityData)
    return {
      name: cityData.currencyName || undefined,
      symbol: cityData.currencySymbol || undefined,
    };
  throw GQLError(500, "Can't update DB");
}
