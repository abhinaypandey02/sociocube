"use client";
import React, { useState } from "react";
import categories from "@/constants/categories";
import { Input } from "@/components/input";
import type { SearchSellersFilters } from "@/__generated__/graphql";
import TagsDisplay from "./tags-display";

export default function CategoryFilter({
  onChange,
  variables,
}: {
  onChange: (data: SearchSellersFilters) => void;
  variables: SearchSellersFilters;
}) {
  const [selected, setSelected] = useState<string[]>(
    variables.categories || [],
  );
  return (
    <div className="space-y-3">
      <Input
        className="block"
        name="category"
        onChange={(e) => {
          const updated = Array.from(new Set([...selected, e.target.value]));
          setSelected(updated);
          onChange({
            categories: updated,
          });
        }}
        options={categories
          .filter((v) => !selected.includes(v.title))
          .map((v) => ({ value: v.title, label: v.title }))}
        placeholder="Category"
      />
      <TagsDisplay
        onClick={(v) => {
          const updated = selected.filter((o) => o !== v);
          setSelected(updated);
          onChange({
            categories: updated,
          });
        }}
        tags={selected}
      />
    </div>
  );
}
