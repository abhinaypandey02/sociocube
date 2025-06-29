import { format } from "@flasd/whatsapp-formatting";
import React from "react";

import type { PostingPlatforms } from "@/__generated__/graphql";
import { URL_REGEX } from "@/constants/regex";

import { POSTING_PLATFORMS } from "./constants";

export function getCurrency(
  isBarter: boolean,
  currencyCode?: string | null,
  price?: number | null,
) {
  if (!isBarter && !price) return null;
  const priceString = currencyCode && price && `${currencyCode}${price}`;
  const priceStringWithBarter = isBarter ? ` (${priceString})` : priceString;
  return `${isBarter ? "Barter" : ""}${priceString ? priceStringWithBarter : ""}`;
}
export function getAgeGroup(min?: number | null, max?: number | null) {
  if (min && max) return `${min} - ${max} y/o`;
  if (min) return `> ${min} y/o`;
  if (max) return `< ${max} y/o`;
}

export function getPlatforms(platform: PostingPlatforms) {
  const Icon = POSTING_PLATFORMS.find(({ value }) => value === platform)?.icon;
  if (Icon) return <Icon key={platform} />;
  return null;
}

export function renderRichText(text: string, isCurrentUser?: boolean) {
  const renderedText = format(text);
  const lines = renderedText.split("<br>");
  const linkClass = isCurrentUser
    ? "text-white underline"
    : "text-accent underline";
  return lines
    .map((line) =>
      line
        .split(URL_REGEX)
        .map((element) => {
          if (element.match(URL_REGEX) && new URL(element)) {
            return `<a
            class="${linkClass}"
            href="${element}"
            rel="noopener"
            target="_blank"
          >
            ${element}
          </a>`;
          }
          return element;
        })
        .join(""),
    )
    .join("<br/>");
}
