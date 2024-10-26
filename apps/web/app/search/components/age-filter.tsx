import React from "react";
import { Input } from "ui/input";
import type { SearchSellers } from "../../../__generated__/graphql";

export default function AgeFilter({
  onChange,
}: {
  onChange: (data: SearchSellers) => void;
}) {
  return (
    <div>
      <Input
        className="block"
        name="from"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          onChange({
            ageFrom: isNaN(val) ? undefined : val,
          });
        }}
        placeholder="Age from"
        type="number"
      />
      <div className="my-5">to</div>
      <Input
        className="block"
        name="to"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          onChange({
            ageTo: isNaN(val) ? undefined : val,
          });
        }}
        placeholder="Age to"
        type="number"
      />
    </div>
  );
}
