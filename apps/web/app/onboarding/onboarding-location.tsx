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
  }, [fetchCountries]);
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
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        Where do you belong!
      </h2>
      <Form
        className="flex flex-col items-center gap-3"
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          className="block"
          name="country"
          options={countries || []}
          placeholder="Country"
          rules={{ required: true }}
        />
        {states ? (
          <Input
            className="block"
            name="state"
            options={states}
            placeholder="State"
            rules={{ required: true }}
          />
        ) : null}
        {cities ? (
          <Input
            className="block"
            name="city"
            options={cities}
            placeholder="City"
            rules={{ required: true }}
          />
        ) : null}
        <Button
          loading={
            loading || loadingCountries || loadingCities || loadingStates
          }
          type="submit"
        >
          Next
        </Button>
      </Form>
    </>
  );
}
