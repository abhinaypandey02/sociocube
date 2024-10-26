import React, { useState } from "react";
import { Input } from "ui/input";
import genders from "commons/genders";
import type { SearchSellers } from "../../../__generated__/graphql";
import TagsDisplay from "./tags-display";

export default function GenderFilter({
  onChange,
}: {
  onChange: (data: SearchSellers) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div>
      <Input
        className="block"
        name="country"
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
        placeholder="Country"
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
