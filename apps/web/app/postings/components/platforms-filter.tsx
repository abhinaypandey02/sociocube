import React, { useState } from "react";
import { Input } from "ui/input";
import type {
  PostingPlatforms,
  SearchPostingsFilters,
} from "../../../__generated__/graphql";
import { POSTING_PLATFORMS } from "../constants";
import TagsDisplay from "../../search/components/tags-display";

export default function PlatformsFilter({
  onChange,
  variables,
}: {
  onChange: (data: SearchPostingsFilters) => void;
  variables: SearchPostingsFilters;
}) {
  const [selected, setSelected] = useState<string[]>(variables.platforms || []);
  return (
    <div className="space-y-3">
      <Input
        className="block"
        name="category"
        onChange={(e) => {
          const updated = Array.from(new Set([...selected, e.target.value]));
          setSelected(updated);
          onChange({
            platforms: updated as PostingPlatforms[],
          });
        }}
        options={POSTING_PLATFORMS.filter((v) => !selected.includes(v.value))}
        placeholder="Category"
      />
      <TagsDisplay
        onClick={(v) => {
          const updated = selected.filter((o) => o !== v);
          setSelected(updated);
          onChange({
            platforms: updated as PostingPlatforms[],
          });
        }}
        tags={selected}
      />
    </div>
  );
}
