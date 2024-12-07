import React from "react";
import { Input } from "ui/input";
import { AGE_RANGES } from "commons/age";
import type { SearchSellersFilters } from "../../../__generated__/graphql";

export default function AgeFilter({
  onChange,
}: {
  onChange: (data: SearchSellersFilters) => void;
}) {
  return (
    <Input
      className="block"
      name="from"
      onChange={(e) => {
        onChange({
          ageRange: parseInt(e.target.value),
        });
      }}
      options={AGE_RANGES.map((range, i) => ({
        value: i,
        label: range.title,
      }))}
      placeholder="Age range"
    />
  );
}
