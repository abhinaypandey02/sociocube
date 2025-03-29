import React from "react";
import { Input } from "@/components/input";
import type { SearchPostingsFilters } from "../../../__generated__/graphql";

export default function FollowersFilter({
  onChange,
  variables,
}: {
  onChange: (data: SearchPostingsFilters) => void;
  variables: SearchPostingsFilters;
}) {
  return (
    <Input
      name="followers"
      onChange={(e) => {
        onChange({
          followers: parseInt(e.target.value),
        });
      }}
      placeholder="Enter followers to find specific campaigns"
      type="number"
      value={variables.followers || undefined}
    />
  );
}
