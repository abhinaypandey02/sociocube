import React from "react";
import { Input } from "ui/input";
import type { SearchSellersFilters } from "../../../__generated__/graphql";

export default function FollowersFilter({
  onChange,
}: {
  onChange: (data: SearchSellersFilters) => void;
}) {
  return (
    <div>
      <Input
        className="block"
        name="from"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          onChange({
            followersFrom: isNaN(val) ? undefined : val,
          });
        }}
        placeholder="Followers from"
        type="number"
      />
      <div className="my-3 text-center text-sm">to</div>
      <Input
        className="block"
        name="to"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          onChange({
            followersTo: isNaN(val) ? undefined : val,
          });
        }}
        placeholder="Followers to"
        type="number"
      />
    </div>
  );
}
