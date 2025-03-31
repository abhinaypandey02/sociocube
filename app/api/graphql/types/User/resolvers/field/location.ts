import { eq } from "drizzle-orm";
import { db } from "@backend/lib/db";
import type { UserDB } from "../../db/schema";
import { LocationTable } from "../../db/schema";
import { CityTable, CountryTable } from "../../../Map/db/schema";

export async function getLocation(user: UserDB) {
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
        currency: city.countries.currencySymbol,
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
    };
  }
  return null;
}
