import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import type { SearchSellersFilters } from "../../../__generated__/graphql";

export default function PriceFilter({
  onChange,
  variables,
}: {
  onChange: (data: SearchSellersFilters) => void;
  variables: SearchSellersFilters;
}) {
  return (
    <MultiRangeSlider
      barInnerColor="#F45B69"
      labels={["<10", "7k", "15k", "22k", "", "36k", "", ">100k"]}
      max={50000}
      maxValue={variables.generalPriceTo || 50000}
      min={10}
      minValue={variables.generalPriceFrom || 10}
      onChange={(val) => {
        onChange({
          generalPriceFrom: val.minValue === 10 ? undefined : val.minValue,
          generalPriceTo: val.maxValue === 50000 ? undefined : val.maxValue,
        });
      }}
      step={10}
      stepOnly
    />
  );
}
