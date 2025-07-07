import { GraphQLError } from "graphql/error";
import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import countries from "@/constants/countries";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "@/lib/apollo-client";
import { UPDATE_USER_LOCATION } from "@/lib/mutations";
import { GET_CITIES } from "@/lib/queries";

interface FormFields {
  country?: number | null;
  city?: number | null;
}

export default function OnboardingLocationForm({
  nextStep,
  setCurrency,
  defaultValues,
  fallbackToStep,
}: {
  nextStep: () => void;
  setCurrency: (currency: string | null | undefined) => void;
  defaultValues: FormFields;
  fallbackToStep: () => void;
  isActive: boolean;
}) {
  const form = useForm({ defaultValues });
  const [updateBasicDetails, { loading }] =
    useAuthMutation(UPDATE_USER_LOCATION);
  const [fetchCities, { data: citiesData, loading: loadingCities }] =
    useAuthQuery(GET_CITIES);
  const [countryCode, setCountryCode] = useState<string>();
  const [cityName, setCityName] = useState<string>();

  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((res) => res.json())
      .then((data: { country: string; city: string }) => {
        setCountryCode(data.country);
        setCityName(data.city);
      })
      .catch((e) => {
        console.error(e, "Error fetching ip info");
      });
  }, []);

  useEffect(() => {
    if (!form.getValues("country") && countryCode) {
      const selectedCountry = countries.find(
        (country) => country.countryCode === countryCode,
      );
      if (selectedCountry) {
        form.setValue("country", selectedCountry.value);
        setCurrency(selectedCountry.currency);
      }
    }
  }, [countryCode]);

  useEffect(() => {
    if (!form.getValues("city") && cityName && citiesData) {
      const selectedCity = citiesData.cities.find(
        (city) => city.label.trim().toLowerCase() === cityName.toLowerCase(),
      );
      if (selectedCity) form.setValue("city", selectedCity.value);
    }
  }, [cityName, citiesData]);

  useEffect(() => {
    const countryID = form.getValues("country");
    if (countryID)
      void fetchCities({
        countryID,
      });
  }, [fetchCities]);

  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name === "country" && value[name]) {
        void fetchCities({
          countryID: value[name],
        });
        setCurrency(countries.find((c) => c.value === value[name])?.currency);
      }
    });
    return sub.unsubscribe;
  }, [form.watch, fetchCities, form]);

  const cities = citiesData?.cities;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.city && data.country) {
      nextStep();
      updateBasicDetails({
        updatedLocation: {
          city: data.city,
          country: data.country,
        },
      }).catch((e) => {
        fallbackToStep();
        handleGQLErrors(e as GraphQLError);
      });
    }
  };
  return (
    <Form className="space-y-3" form={form} onSubmit={onSubmit}>
      <Input
        className="block"
        label="Country"
        name="country"
        options={countries || []}
        placeholder="Select your country"
        rules={{ required: true }}
      />
      {cities ? (
        <Input
          className="block"
          label="City"
          name="city"
          options={cities}
          placeholder="Select your city"
        />
      ) : null}
      <Button
        className="ml-auto"
        disabled={!form.watch("city")}
        loading={loading || loadingCities}
        type="submit"
      >
        Next
      </Button>
    </Form>
  );
}
