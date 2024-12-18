import { eq } from "drizzle-orm";
import { OnboardingDataTable, PricingTable, UserDB } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { OnboardingData, Pricing } from "../../type";
import { CityTable, CountryTable } from "../../../Map/db/schema";

export async function getOnboardingData(user: UserDB) {
  if (!user.onboardingData) return null;
  const [data] = await db
    .select()
    .from(OnboardingDataTable)
    .where(eq(OnboardingDataTable.id, user.onboardingData));
  const onboardingData: OnboardingData = {
    ...data,
    pricing: undefined,
  } as OnboardingData;
  if (data?.city) {
    const [res] = await db
      .select()
      .from(CityTable)
      .innerJoin(CountryTable, eq(CountryTable.id, CityTable.countryId))
      .where(eq(CityTable.id, data.city));
    if (res) {
      onboardingData.state = res.cities.stateId;
      onboardingData.country = res.cities.countryId;
      onboardingData.currency = {
        symbol: res.countries.currencySymbol || undefined,
        name: res.countries.currencyName || undefined,
      };
    }
  }
  if (data?.pricing) {
    const [pricing] = await db
      .select()
      .from(PricingTable)
      .where(eq(PricingTable.id, data.pricing));
    if (pricing) {
      onboardingData.pricing = pricing as Pricing;
    }
  }
  return onboardingData;
}

export function getIsOnboarded(user: UserDB) {
  return Boolean(
    user.photo &&
      user.name &&
      user.category &&
      user.gender &&
      user.instagramDetails &&
      user.location &&
      user.isOnboarded,
  );
}
