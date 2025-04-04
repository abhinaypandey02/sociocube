"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { useAuthQuery } from "@/lib/apollo-client";
import { GET_CITIES, GET_COUNTRIES } from "@/lib/queries";
import type { SearchSellersFilters } from "@/__generated__/graphql";

export default function CountryFilter({
  onChange,
  variables,
}: {
  onChange: (data: {
    countries?: number[] | null;
    cities?: number[] | null;
  }) => void;
  variables: SearchSellersFilters;
}) {
  const [countryID, setCountryID] = useState<number | undefined>(
    variables.countries?.[0],
  );
  const [cityID, setCityID] = useState<number | undefined>(
    variables.cities?.[0],
  );
  const [fetchCountries, { data: countriesData }] = useAuthQuery(GET_COUNTRIES);
  const [fetchCities, { data: citiesData }] = useAuthQuery(GET_CITIES);

  useEffect(() => {
    void fetchCountries();
  }, [fetchCountries]);
  useEffect(() => {
    if (countryID)
      void fetchCities({
        countryID,
      });
  }, [countryID]);

  const countries = countriesData?.countries;
  const cities = citiesData?.cities;
  return (
    <>
      <Input
        className="block"
        name="country"
        onChange={(e) => {
          setCountryID(parseInt(e.target.value));
          setCityID(undefined);
          onChange({
            countries: [parseInt(e.target.value)],
            cities: undefined,
          });
        }}
        options={countries || []}
        placeholder="Country"
        value={countryID}
      />
      {cities ? (
        <Input
          className="block"
          name="city"
          onChange={(e) => {
            setCityID(parseInt(e.target.value));
            onChange({
              cities: [parseInt(e.target.value)],
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
