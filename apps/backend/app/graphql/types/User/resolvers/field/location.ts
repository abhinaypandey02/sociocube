import { eq } from "drizzle-orm";
import { LocationTable, UserDB } from "../../db/schema";
import { db } from "../../../../../../lib/db";
import { CityTable, CountryTable } from "../../../Map/db/schema";
import { AgencyDB } from "../../../Agency/db/schema";

export async function getLocation(user: UserDB | AgencyDB) {
  if (user.location) {
    const [city] = await db
      .select()
      .from(LocationTable)
      .where(eq(LocationTable.id, user.location))
      .innerJoin(CountryTable, eq(CountryTable.id, LocationTable.country))
      .leftJoin(CityTable, eq(CityTable.id, LocationTable.city));
    if (city)
      return {
        city: city.cities?.name,
        country: city.countries.name,
        currency: {
          symbol: city.countries.currencySymbol || undefined,
          name: city.countries.currencyName || undefined,
          code: city.countries.currency || undefined,
        },
      };
  }
  return null;
}

export async function getLocationID(user: UserDB) {
  if (user.location) {
    const [location] = await db
      .select()
      .from(LocationTable)
      .where(eq(LocationTable.id, user.location));
    return {
      ...location,
      city: location?.city || undefined,
      state: location?.state || undefined,
    };
  }
  return null;
}
