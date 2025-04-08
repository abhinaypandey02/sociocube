"use client";
import React from "react";

import type { SearchSellersFilters } from "@/__generated__/graphql";
import { Input } from "@/components/input";
import { AGE_RANGES } from "@/constants/age";

export default function AgeFilter({
  onChange,
  variables,
}: {
  variables: SearchSellersFilters;
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
      value={variables.ageRange || undefined}
    />
  );
}
