import React from "react";

import type { PostingPlatforms } from "@/__generated__/graphql";

import { POSTING_PLATFORMS } from "./constants";

export function getCurrency(
  isBarter: boolean,
  currencyCode?: string | null,
  price?: number | null,
) {
  if (!isBarter && !price) return "Not specified";
  const priceString = currencyCode && price && `${currencyCode}${price}`;
  const priceStringWithBarter = isBarter ? ` (${priceString})` : priceString;
  return `${isBarter ? "Barter" : ""}${priceString ? priceStringWithBarter : ""}`;
}
export function getAgeGroup(min?: number | null, max?: number | null) {
  if (min && max) return `${min} - ${max} years`;
  if (min) return `> ${min} years`;
  if (max) return `< ${max} years`;
}

export function getPlatforms(platforms: PostingPlatforms[]) {
  return platforms.map((item) => {
    const Icon = POSTING_PLATFORMS.find(
      (platform) => platform.value === item,
    )?.icon;
    if (Icon) return <Icon key={item} />;
    return null;
  });
}
