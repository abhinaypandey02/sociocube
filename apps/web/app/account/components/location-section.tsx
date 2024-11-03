import React, { useEffect } from "react";
import { Input } from "ui/input";
import { type SubmitHandler, useForm } from "react-hook-form";
import Form from "ui/form";
import { Button } from "ui/button";
import { useRouter } from "next/navigation";
import { useAuthMutation, useAuthQuery } from "../../../lib/apollo-client";
import { UPDATE_USER } from "../../../lib/mutations";
import { GET_CITIES, GET_COUNTRIES, GET_STATES } from "../../../lib/queries";
import ContentTemplate from "./content-template";
import type { AccountSectionData } from "./account-view";

export default function LocationSection({
  data,
}: {
  data: AccountSectionData;
}) {
  const form = useForm({
    defaultValues: data.locationID || {
      country: null,
      state: null,
      city: null,
    },
  });
  const [saveUserMutation, { loading }] = useAuthMutation(UPDATE_USER);
  const router = useRouter();
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
  const onSubmit: SubmitHandler<
    NonNullable<AccountSectionData["locationID"]>
  > = async ({ city }) => {
    if (city) {
      await saveUserMutation({
        data: {
          city,
        },
      });
      router.refresh();
    }
  };
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
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <ContentTemplate
          description="Add or update details about your location"
          title="Location"
        >
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
            {form.watch("city") && (
              <Button
                className="!mt-8 ml-auto block "
                loading={
                  loading || loadingCountries || loadingCities || loadingStates
                }
                type="submit"
              >
                Save
              </Button>
            )}
          </Form>
        </ContentTemplate>
      </div>
    </main>
  );
}
