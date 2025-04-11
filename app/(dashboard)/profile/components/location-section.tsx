import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "@/lib/apollo-client";
import { UPDATE_USER_LOCATION } from "@/lib/mutations";
import { GET_CITIES, GET_COUNTRIES } from "@/lib/queries";

import type { AccountSectionData } from "./account-view";
import ContentTemplate from "./content-template";

export default function LocationSection({
  data,
}: {
  data: AccountSectionData;
}) {
  const form = useForm({
    defaultValues: data.locationID || {
      country: null,
      city: null,
    },
  });
  const [saveUserMutation, { loading }] = useAuthMutation(UPDATE_USER_LOCATION);
  const router = useRouter();
  const [fetchCountries, { data: countriesData, loading: loadingCountries }] =
    useAuthQuery(GET_COUNTRIES);
  const [fetchCities, { data: citiesData, loading: loadingCities }] =
    useAuthQuery(GET_CITIES);

  useEffect(() => {
    void fetchCountries();
    const countryID = form.getValues("country");
    if (countryID)
      void fetchCities({
        countryID,
      });
  }, [fetchCountries, fetchCities]);
  const onSubmit: SubmitHandler<
    NonNullable<AccountSectionData["locationID"]>
  > = async ({ city, country }) => {
    if (city && country) {
      await saveUserMutation({
        updatedLocation: {
          city,
          country,
        },
      })
        .catch(handleGQLErrors)
        .then(() => {
          toast.success("Updated locations successfully.");
        });
      router.refresh();
    }
  };
  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name === "country" && value[name])
        void fetchCities({
          countryID: value[name],
        });
    });
    return sub.unsubscribe;
  }, [form.watch, fetchCities, form]);
  const countries = countriesData?.countries;
  const cities = citiesData?.cities;
  return (
    <div className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
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
            {cities ? (
              <Input
                className="block"
                label="City"
                name="city"
                options={cities}
                placeholder="Select your city"
              />
            ) : null}
            {form.watch("city") && (
              <Button
                className="mt-8! ml-auto block "
                loading={loading || loadingCountries || loadingCities}
                type="submit"
              >
                Save
              </Button>
            )}
          </Form>
        </ContentTemplate>
      </div>
    </div>
  );
}
