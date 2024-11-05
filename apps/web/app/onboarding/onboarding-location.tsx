"use client";
import React, { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { useAuthMutation, useAuthQuery } from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_LOCATION } from "../../lib/mutations";
import { GET_CITIES, GET_COUNTRIES, GET_STATES } from "../../lib/queries";

export default function OnboardingLocationForm({
  defaultValues,
  nextStep,
}: {
  defaultValues: {
    country?: number | null;
    state?: number | null;
    city?: number | null;
  };
  nextStep: () => void;
}) {
  const form = useForm({ defaultValues });
  const [updateBasicDetails, { loading }] = useAuthMutation(
    UPDATE_ONBOARDING_LOCATION,
  );
  const [fetchCountries, { data: countriesData, loading: loadingCountries }] =
    useAuthQuery(GET_COUNTRIES);
  const [fetchStates, { data: statesData, loading: loadingStates }] =
    useAuthQuery(GET_STATES);
  const [fetchCities, { data: citiesData, loading: loadingCities }] =
    useAuthQuery(GET_CITIES);

  useEffect(() => {
    void fetchCountries();
    const country = form.getValues("country"),
      state = form.getValues("state");
    if (country)
      void fetchStates({
        country,
      });
    if (state)
      void fetchCities({
        state,
      });
  }, [fetchCountries, fetchStates, fetchCities]);
  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name === "country" && value[name])
        void fetchStates({
          country: value[name],
        });
      if (name === "state" && value[name])
        void fetchCities({
          state: value[name],
        });
    });
    return sub.unsubscribe;
  }, [form.watch, fetchCities, form, fetchStates]);

  const countries = countriesData?.countries;
  const states = statesData?.states;
  const cities = citiesData?.cities;
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (data.city) {
      const res = await updateBasicDetails({
        data: {
          city: data.city,
        },
      });
      if (res.data?.updateOnboardingLocation) nextStep();
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
      {states ? (
        <Input
          className="block"
          label="State"
          name="state"
          options={states}
          placeholder="Select your state"
          rules={{ required: true }}
        />
      ) : null}
      {cities ? (
        <Input
          className="block"
          label="City"
          name="city"
          options={cities}
          placeholder="Select your city"
          rules={{ required: true }}
        />
      ) : null}
      <Button
        className="ml-auto"
        disabled={!form.watch("city")}
        loading={loading || loadingCountries || loadingCities || loadingStates}
        type="submit"
      >
        Next
      </Button>
    </Form>
  );
}
