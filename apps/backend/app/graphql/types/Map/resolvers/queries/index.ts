import { Arg, Query, Resolver } from "type-graphql";
import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { CityTable, CountryTable, StateTable } from "../../db/schema";
import { SelectOption } from "../../../../utils/select-options";

@Resolver()
export class MapQueryResolver {
  @Query(() => [SelectOption])
  async getCountries(): Promise<SelectOption[]> {
    const countries = await db.select().from(CountryTable);
    return countries.map((country) => ({
      id: country.id,
      label: country.name,
    }));
  }

  @Query(() => [SelectOption])
  async getStates(@Arg("country") country: number): Promise<SelectOption[]> {
    const states = await db
      .select()
      .from(StateTable)
      .where(eq(StateTable.countryId, country));
    return states.map((state) => ({
      id: state.id,
      label: state.name,
    }));
  }

  @Query(() => [SelectOption])
  async getCities(@Arg("state") state: number): Promise<SelectOption[]> {
    const citites = await db
      .select()
      .from(CityTable)
      .where(eq(CityTable.stateId, state));
    return citites.map((city) => ({
      id: city.id,
      label: city.name,
    }));
  }
}
