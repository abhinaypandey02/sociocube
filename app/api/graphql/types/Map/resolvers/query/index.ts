import { Arg, Int, Query, Resolver } from "type-graphql";
import { eq } from "drizzle-orm";
import { db } from "../../../../../lib/db";
import { CityTable, CountryTable, StateTable } from "../../db/schema";
import { SelectOption } from "../../../../utils/select-options";

@Resolver()
export class MapQueryResolvers {
  @Query(() => [SelectOption])
  async getCountries(): Promise<SelectOption[]> {
    const countries = await db.select().from(CountryTable);
    return countries.map((country) => ({
      value: country.id,
      label: country.name,
    }));
  }

  @Query(() => [SelectOption])
  async getStates(
    @Arg("countryID", () => Int) countryID: number,
  ): Promise<SelectOption[]> {
    const states = await db
      .select()
      .from(StateTable)
      .where(eq(StateTable.countryId, countryID));
    return states.map((state) => ({
      value: state.id,
      label: state.name,
    }));
  }

  @Query(() => [SelectOption])
  async getCities(
    @Arg("stateID", () => Int) stateID: number,
  ): Promise<SelectOption[]> {
    const cities = await db
      .select()
      .from(CityTable)
      .where(eq(CityTable.stateId, stateID));
    return cities.map((city) => ({
      value: city.id,
      label: city.name,
    }));
  }
}
