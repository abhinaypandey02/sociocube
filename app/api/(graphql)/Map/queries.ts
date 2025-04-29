import { db } from "@backend/lib/db";
import { CitySelectOption } from "@backend/lib/utils/select-options";
import { eq } from "drizzle-orm";
import { Arg, Int, Query, Resolver } from "type-graphql";

import { CityTable } from "./db";

@Resolver()
export class MapQueryResolvers {
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
      label:
        city.name +
        (city.stateCode && city.duplicate ? `, ${city.stateCode}` : ""),
    }));
  }
}
