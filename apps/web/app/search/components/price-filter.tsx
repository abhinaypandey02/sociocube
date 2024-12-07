import React from "react";
import { Input } from "ui/input";
import type { SearchSellersFilters } from "../../../__generated__/graphql";

export default function PriceFilter({
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
            generalPriceFrom: isNaN(val) ? undefined : val,
          });
        }}
        placeholder="Price from"
        type="number"
      />
      <div className="my-3 text-center text-sm">to</div>
      <Input
        className="block"
        name="to"
        onChange={(e) => {
          const val = parseInt(e.target.value);
          onChange({
            generalPriceTo: isNaN(val) ? undefined : val,
          });
        }}
        placeholder="Price to"
        type="number"
      />
    </div>
  );
}
