import React, { useEffect, useState } from "react";
import { Input } from "ui/input";
import { useAuthQuery } from "../../../lib/apollo-client";
import { GET_CITIES, GET_COUNTRIES, GET_STATES } from "../../../lib/queries";

export default function CountryFilter({
  onChange,
}: {
  onChange: (data: {
    countries?: number[] | null;
    states?: number[] | null;
    cities?: number[] | null;
  }) => void;
}) {
  const [countryID, setCountryID] = useState<number>();
  const [stateID, setStateID] = useState<number>();
  const [cityID, setCityID] = useState<number>();
  const [fetchCountries, { data: countriesData }] = useAuthQuery(GET_COUNTRIES);
  const [fetchStates, { data: statesData }] = useAuthQuery(GET_STATES);
  const [fetchCities, { data: citiesData }] = useAuthQuery(GET_CITIES);

  useEffect(() => {
    void fetchCountries();
  }, [fetchCountries]);
  useEffect(() => {
    if (countryID)
      void fetchStates({
        countryID,
      });
  }, [countryID]);
  useEffect(() => {
    if (stateID)
      void fetchCities({
        stateID,
      });
  }, [stateID]);

  const countries = countriesData?.countries;
  const states = statesData?.states;
  const cities = citiesData?.cities;
  return (
    <>
      <Input
        className="block"
        name="country"
        onChange={(e) => {
          setCountryID(parseInt(e.target.value));
          setStateID(undefined);
          setCityID(undefined);
          onChange({
            countries: [parseInt(e.target.value)],
            states: undefined,
            cities: undefined,
          });
        }}
        options={countries || []}
        placeholder="Country"
        value={countryID}
      />
      {states ? (
        <Input
          className="block"
          name="state"
          onChange={(e) => {
            setStateID(parseInt(e.target.value));
            setCityID(undefined);
            onChange({
              states: [parseInt(e.target.value)],
              countries: undefined,
              cities: undefined,
            });
          }}
          options={states}
          placeholder="State"
          value={stateID}
        />
      ) : null}
      {cities ? (
        <Input
          className="block"
          name="city"
          onChange={(e) => {
            setCityID(parseInt(e.target.value));
            onChange({
              cities: [parseInt(e.target.value)],
              states: undefined,
              countries: undefined,
            });
          }}
          options={cities}
          placeholder="City"
          value={cityID}
        />
      ) : null}
    </>
  );
}
