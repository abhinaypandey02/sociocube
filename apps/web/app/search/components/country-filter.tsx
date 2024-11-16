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
  const [country, setCountry] = useState<number>();
  const [state, setState] = useState<number>();
  const [city, setCity] = useState<number>();
  const [fetchCountries, { data: countriesData }] = useAuthQuery(GET_COUNTRIES);
  const [fetchStates, { data: statesData }] = useAuthQuery(GET_STATES);
  const [fetchCities, { data: citiesData }] = useAuthQuery(GET_CITIES);

  useEffect(() => {
    void fetchCountries();
  }, [fetchCountries]);
  useEffect(() => {
    if (country)
      void fetchStates({
        country,
      });
  }, [country]);
  useEffect(() => {
    if (state)
      void fetchCities({
        state,
      });
  }, [state]);

  const countries = countriesData?.countries;
  const states = statesData?.states;
  const cities = citiesData?.cities;
  return (
    <>
      <Input
        className="block"
        name="country"
        onChange={(e) => {
          setCountry(parseInt(e.target.value));
          setState(undefined);
          setCity(undefined);
          onChange({
            countries: [parseInt(e.target.value)],
            states: undefined,
            cities: undefined,
          });
        }}
        options={countries || []}
        placeholder="Country"
        value={country}
      />
      {states ? (
        <Input
          className="block"
          name="state"
          onChange={(e) => {
            setState(parseInt(e.target.value));
            setCity(undefined);
            onChange({
              states: [parseInt(e.target.value)],
              countries: undefined,
              cities: undefined,
            });
          }}
          options={states}
          placeholder="State"
          value={state}
        />
      ) : null}
      {cities ? (
        <Input
          className="block"
          name="city"
          onChange={(e) => {
            setCity(parseInt(e.target.value));
            onChange({
              cities: [parseInt(e.target.value)],
              states: undefined,
              countries: undefined,
            });
          }}
          options={cities}
          placeholder="City"
          value={city}
        />
      ) : null}
    </>
  );
}
