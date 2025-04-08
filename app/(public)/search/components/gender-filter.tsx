"use client";
import React, { useState } from "react";

import type { SearchSellersFilters } from "@/__generated__/graphql";
import { Input } from "@/components/input";
import genders from "@/constants/genders";

import TagsDisplay from "./tags-display";

export default function GenderFilter({
  onChange,
  variables,
}: {
  onChange: (data: SearchSellersFilters) => void;
  variables: SearchSellersFilters;
}) {
  const [selected, setSelected] = useState<string[]>(variables.genders || []);
  return (
    <div className="space-y-3">
      <Input
        className="block"
        name="gender"
        onChange={(e) => {
          const updated = Array.from(new Set([...selected, e.target.value]));
          setSelected(updated);
          onChange({
            genders: updated,
          });
        }}
        options={genders
          .filter((v) => !selected.includes(v))
          .map((v) => ({ value: v, label: v }))}
        placeholder="Gender"
      />
      <TagsDisplay
        onClick={(v) => {
          const updated = selected.filter((o) => o !== v);
          setSelected(updated);
          onChange({
            genders: updated,
          });
        }}
        tags={selected}
      />
    </div>
  );
}
