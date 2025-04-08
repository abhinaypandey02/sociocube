import { db } from "@backend/lib/db";
import {
  CitySelectOption,
  CountrySelectOption,
} from "@graphql/utils/select-options";
import { eq } from "drizzle-orm";
import { Arg, Int, Query, Resolver } from "type-graphql";

import { CityTable, CountryTable } from "../../db/schema";

@Resolver()
export class MapQueryResolvers {
  @Query(() => [CountrySelectOption])
  async getCountries(): Promise<CountrySelectOption[]> {
    const countries = await db.select().from(CountryTable);
    return countries.map((country) => ({
      value: country.id,
      label: country.name,
      countryCode: country.iso2,
      currency: country.currencySymbol,
    }));
  }

  @Query(() => [CitySelectOption])
  async getCities(
    @Arg("countryID", () => Int) countryID: number,
  ): Promise<CitySelectOption[]> {
    const cities = await db
      .select()
      .from(CityTable)
      .where(eq(CityTable.countryId, countryID));
    return cities.map((city) => ({
      value: city.id,
      label: city.name,
    }));
  }
}
