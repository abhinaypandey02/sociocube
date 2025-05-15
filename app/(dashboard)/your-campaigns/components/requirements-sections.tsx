"use client";
import { Pencil, X } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { GetPostingQuery } from "@/__generated__/graphql";
import { getAgeGroup } from "@/app/(dashboard)/campaigns/utils";
import AccountCard from "@/app/(dashboard)/profile/components/account-card";
import LocationSelector from "@/app/(dashboard)/your-campaigns/components/location-selector";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import countriesData from "@/constants/countries";
import { useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_POSTING } from "@/lib/mutations";
import { convertToAbbreviation } from "@/lib/utils";

export default function RequirementsSections({
  posting: postingData,
}: {
  posting: NonNullable<GetPostingQuery["posting"]>;
}) {
  const [locationNames, setLocationNames] = useState<string[]>([
    ...countriesData
      .filter((c) => postingData.countries?.includes(c.value))
      .map((country) => country.label),
    ...(postingData.states || []).map((state) => state.label),
    ...(postingData.cities || []).map((city) => city.label),
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => setIsEditing(!isEditing);
  const [posting, setPosting] = useState(postingData);
  const ageGroup = getAgeGroup(posting.minimumAge, posting.maximumAge);
  const noRequirements = !ageGroup && !posting.minimumFollowers;
  return (
    <AccountCard
      title={"Requirements"}
      cta={
        <Button square borderless invert onClick={handleEditClick}>
          {isEditing ? <X /> : <Pencil />}
        </Button>
      }
    >
      {!isEditing && (
        <div className={"mt-2"}>
          {noRequirements && (
            <div className={"text-gray-500 text-center my-3 text-sm"}>
              No requirements added
            </div>
          )}
          {ageGroup && (
            <div className="">
              <dt className=" font-semibold leading-6  text-sm text-gray-900">
                Age group
              </dt>
              <dd className="text-sm  leading-6 text-gray-600 ">{ageGroup}</dd>
            </div>
          )}
          {posting.minimumFollowers ? (
            <div className="">
              <dt className=" font-semibold leading-6  text-sm text-gray-900">
                Minimum followers
              </dt>
              <dd className="text-sm  leading-6 text-gray-600 ">
                {convertToAbbreviation(posting.minimumFollowers)}
              </dd>
            </div>
          ) : null}
          {locationNames.length ? (
            <div className="">
              <dt className=" font-semibold leading-6  text-sm text-gray-900">
                Locations
              </dt>
              <dd className="text-sm  leading-6 text-gray-600 ">
                {locationNames.join(", ")}
              </dd>
            </div>
          ) : null}
        </div>
      )}
      <PostingRequirementsForm
        onClose={() => setIsEditing(false)}
        posting={posting}
        isEditing={isEditing}
        setPosting={setPosting}
        setLocationNames={setLocationNames}
        locationNames={locationNames}
      />
    </AccountCard>
  );
}

function PostingRequirementsForm({
  posting,
  onClose,
  setPosting,
  isEditing,
  setLocationNames,
  locationNames,
}: {
  posting: NonNullable<GetPostingQuery["posting"]>;
  onClose: () => void;
  setPosting: (posting: NonNullable<GetPostingQuery["posting"]>) => void;
  isEditing: boolean;
  setLocationNames: (value: string[]) => void;
  locationNames: string[];
}) {
  const [locationValues, setLocationValues] = useState<{
    cities: number[];
    states: number[];
    countries: number[];
  }>();
  const form = useForm({
    defaultValues: {
      ...posting,
      deliverables: posting.deliverables?.join(", "),
    },
  });

  const [updatePosting] = useAuthMutation(UPDATE_POSTING);
  if (!isEditing) return null;

  return (
    <Form
      onSubmit={(data) => {
        setPosting({ ...data, deliverables: undefined });
        void updatePosting({
          id: posting.id,
          newPosting: {
            minimumAge: data.minimumAge,
            maximumAge: data.maximumAge,
            minimumFollowers: data.minimumFollowers,
            ...locationValues,
          },
        });
        onClose();
      }}
      className={"space-y-4 pt-4"}
      form={form}
    >
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Minumum Age"
          min={18}
          name="minimumAge"
          placeholder="20"
          rules={{ valueAsNumber: true, min: 18 }}
          type="number"
        />
        <Input
          label="Maximum Age"
          name="maximumAge"
          placeholder="35"
          rules={{ valueAsNumber: true }}
          type="number"
        />
      </div>
      <Input
        label="Minumum Followers"
        name="minimumFollowers"
        placeholder="Required instagram followers"
        rules={{ valueAsNumber: true }}
        type="number"
      />

      <LocationSelector
        locationNames={locationNames}
        cities={posting.cities}
        states={posting.states}
        countries={posting.countries}
        onChange={(values, names) => {
          setLocationNames(names);
          setLocationValues(values);
        }}
      />
      <div className="flex mt-4 justify-end gap-2">
        <Button invert onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
