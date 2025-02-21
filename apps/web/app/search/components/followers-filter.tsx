"use client";
import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import type { SearchSellersFilters } from "../../../__generated__/graphql";

export default function FollowersFilter({
  onChange,
  variables,
}: {
  onChange: (data: SearchSellersFilters) => void;
  variables: SearchSellersFilters;
}) {
  return (
    <MultiRangeSlider
      barInnerColor="#F45B69"
      labels={["<10", "12k", "25k", "", "50k", "", "75k", "", ">100k"]}
      max={100000}
      maxValue={variables.followersTo || 100000}
      min={10}
      minValue={variables.followersFrom || 10}
      onChange={(val) => {
        onChange({
          followersFrom: val.minValue === 10 ? undefined : val.minValue,
          followersTo: val.maxValue === 100000 ? undefined : val.maxValue,
        });
      }}
      step={500}
      stepOnly
    />
  );
}
