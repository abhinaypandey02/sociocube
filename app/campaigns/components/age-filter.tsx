import React from "react";
import { Input } from "@/components/input";
import type { SearchPostingsFilters } from "@/__generated__/graphql";

export default function AgeFilter({
  onChange,
  variables,
}: {
  onChange: (data: SearchPostingsFilters) => void;
  variables: SearchPostingsFilters;
}) {
  return (
    <Input
      name="age"
      onChange={(e) => {
        onChange({
          age: parseInt(e.target.value),
        });
      }}
      placeholder="Enter age to find specific campaigns"
      type="number"
      value={variables.age || undefined}
    />
  );
}
