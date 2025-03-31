"use client";
import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { GraphQLError } from "graphql/error";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Form from "@/components/form";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "@/lib/apollo-client";
import { GET_CITIES, GET_COUNTRIES } from "@/lib/queries";
import { UPDATE_USER_LOCATION } from "@/lib/mutations";

interface FormFields {
  country?: number | null;
  state?: number | null;
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
}) {
  const router = useRouter();
  const form = useForm({ defaultValues });
  const [updateBasicDetails, { loading }] =
    useAuthMutation(UPDATE_USER_LOCATION);
  const [fetchCountries, { data: countriesData, loading: loadingCountries }] =
    useAuthQuery(GET_COUNTRIES);
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
    if (!form.getValues("country") && countryCode && countriesData) {
      const selectedCountry = countriesData.countries.find(
        (country) => country.countryCode === countryCode,
      );
      if (selectedCountry) form.setValue("country", selectedCountry.value);
    }
  }, [countryCode, countriesData]);

  useEffect(() => {
    if (!form.getValues("city") && cityName && citiesData) {
      const selectedCity = citiesData.cities.find(
        (city) => city.label.trim().toLowerCase() === cityName.toLowerCase(),
      );
      if (selectedCity) form.setValue("city", selectedCity.value);
    }
  }, [cityName, citiesData]);

  useEffect(() => {
    void fetchCountries();
    const countryID = form.getValues("country");
    if (countryID)
      void fetchCities({
        countryID,
      });
  }, [fetchCountries, fetchCities]);

  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name === "country" && value[name]) {
        void fetchCities({
          countryID: value[name],
        });
        setCurrency(
          countriesData?.countries.find((c) => c.value === value[name])
            ?.currency,
        );
      }
    });
    return sub.unsubscribe;
  }, [form.watch, fetchCities, form]);

  const countries = countriesData?.countries;
  const cities = citiesData?.cities;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.city && data.country) {
      nextStep();
      updateBasicDetails({
        updatedLocation: {
          city: data.city,
          country: data.country,
        },
      })
        .catch((e) => {
          fallbackToStep();
          handleGQLErrors(e as GraphQLError);
        })
        .finally(() => {
          router.refresh();
        });
    }
  };
  return (
    <Form
      className="space-y-3"
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
        loading={loading || loadingCountries || loadingCities}
        type="submit"
      >
        Next
      </Button>
    </Form>
  );
}
