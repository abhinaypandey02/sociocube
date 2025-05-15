import { Plus, X } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Posting } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import Modal from "@/components/modal";
import countriesData from "@/constants/countries";
import { useAuthQuery } from "@/lib/apollo-client";
import { GET_CITIES, GET_STATES } from "@/lib/queries";

interface FieldValues {
  country?: number;
  state?: number;
  city?: number;
}

export default function LocationSelector({
  countries,
  cities,
  states,
  locationNames: defaultLocationNames,
  onChange,
}: {
  countries: Posting["countries"];
  states: Posting["states"];
  cities: Posting["cities"];
  locationNames: string[];
  onChange: (
    values: {
      cities: number[];
      states: number[];
      countries: number[];
    },
    names: string[],
  ) => void;
}) {
  const [locations, setLocations] = React.useState<FieldValues[]>([
    ...(countries || []).map((country) => ({ country })),
    ...(states || []).map((state) => ({ state: state.value })),
    ...(cities || []).map((city) => ({ city: city.value })),
  ]);
  const [locationNames, setLocationNames] =
    React.useState<string[]>(defaultLocationNames);

  const form = useForm<FieldValues>();

  const [selectedCountry, setSelectedCountry] = React.useState<number>();

  const [fetchCities, { data: citiesData, loading: loadingCities }] =
    useAuthQuery(GET_CITIES);
  const [fetchStates, { data: statesData, loading: loadingStates }] =
    useAuthQuery(GET_STATES);

  const handleClose = () => {
    setSelectedCountry(undefined);
    form.reset();
    setIsModalOpen(false);
  };
  const handleUpdate = (
    newLocations: FieldValues[],
    newLocationNames: string[],
  ) => {
    setLocationNames(newLocationNames);
    setLocations(newLocations);

    onChange(
      {
        cities: newLocations.map((v) => v.city).filter(Boolean) as number[],
        states: newLocations.map((v) => v.state).filter(Boolean) as number[],
        countries: newLocations
          .map((v) => v.country)
          .filter(Boolean) as number[],
      },
      newLocationNames,
    );
  };

  useEffect(() => {
    const sub = form.watch((_, { name }) => {
      if (name === "country") {
        const countryID = form.getValues("country");
        setSelectedCountry(countryID);
        if (countryID) {
          void fetchCities({ countryID });
          void fetchStates({
            countryID,
          });
        }
      }
      if (name === "state") {
        const stateID = form.getValues("state");
        if (stateID) {
          void fetchCities({ stateID, countryID: -1 });
        }
      }
    });
    return sub.unsubscribe;
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div>
      <label className={"mb-2 block font-medium font-poppins"}>Locations</label>
      <div className={""}>
        {locationNames.map((name, index) => {
          return (
            <button
              type={"button"}
              onClick={() => {
                handleUpdate(
                  locations.filter((_, i) => i !== index),
                  locationNames.filter((_, i) => i !== index),
                );
              }}
              className={
                "inline-flex bg-gray-100 rounded-full px-2 py-1 mr-2 mb-2 gap-2 items-center"
              }
              key={index}
            >
              {name} <X />
            </button>
          );
        })}
      </div>
      <Button
        invert
        className={"mt-2 gap-2"}
        compact
        onClick={() => setIsModalOpen(true)}
      >
        Add
        <Plus />
      </Button>
      <Modal open={isModalOpen} close={handleClose} title={"Add Location"}>
        <Form
          className="space-y-3 mt-3"
          form={form}
          onSubmit={(values) => {
            let name: string | undefined;
            if (values.country)
              name = countriesData.find(
                (c) => c.value === values.country,
              )?.label;
            if (values.state) {
              values.country = undefined;
              name = statesData?.states.find(
                (s) => s.value === values.state,
              )?.label;
            }
            if (values.city) {
              values.country = undefined;
              values.state = undefined;
              name = citiesData?.cities.find(
                (s) => s.value === values.city,
              )?.label;
            }
            if (name) {
              handleUpdate([...locations, values], [...locationNames, name]);
            }
            handleClose();
          }}
        >
          <Input
            className="block"
            label="Country"
            name="country"
            options={countriesData || []}
            placeholder="Select your country"
            rules={{ required: true }}
          />
          {statesData && selectedCountry && (
            <Input
              className="block"
              label="State"
              name="state"
              options={statesData.states || []}
              placeholder="Select your state"
            />
          )}
          {citiesData && selectedCountry && (
            <Input
              className="block"
              label="City"
              name="city"
              options={citiesData.cities || []}
              placeholder="Select your city"
            />
          )}
          <Button
            loading={loadingCities || loadingStates}
            className="ml-auto"
            type="submit"
          >
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
