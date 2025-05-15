import { db } from "@backend/lib/db";
import { CitySelectOption } from "@backend/lib/utils/select-options";
import { eq } from "drizzle-orm";
import { Arg, Int, Query, Resolver } from "type-graphql";

import { CityTable, StateTable } from "./db";

@Resolver()
export class MapQueryResolvers {
  @Query(() => [CitySelectOption])
  async getCities(
    @Arg("countryID", () => Int) countryID: number,
    @Arg("stateID", () => Int, { nullable: true }) stateID: number | null,
  ): Promise<CitySelectOption[]> {
    const cities = await db
      .select()
      .from(CityTable)
      .where(
        stateID
          ? eq(CityTable.stateId, stateID)
          : eq(CityTable.countryId, countryID),
      );
    return cities.map((city) => ({
      value: city.id,
      label:
        city.name +
        (city.stateCode && city.duplicate ? `, ${city.stateCode}` : ""),
    }));
  }
  @Query(() => [CitySelectOption])
  async getStates(
    @Arg("countryID", () => Int) countryID: number,
  ): Promise<CitySelectOption[]> {
    const states = await db
      .select()
      .from(StateTable)
      .where(eq(StateTable.countryId, countryID));
    return states.map((state) => ({
      value: state.id,
      label: state.name,
    }));
  }
}
