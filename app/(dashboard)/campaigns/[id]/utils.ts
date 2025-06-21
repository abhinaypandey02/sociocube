import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import countriesData from "@/constants/countries";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";

import { getAgeGroup, getCurrency } from "../utils";

export function getShareText(
  posting: NonNullable<GetAllPostingsQuery["postings"][number]>,
) {
  const locationNames = [
    ...countriesData
      .filter((c) => posting.countries?.includes(c.value))
      .map((country) => country.label),
    ...(posting.states || []).map((state) => state.label),
    ...(posting.cities || []).map((city) => city.label),
  ];
  const price = getCurrency(posting.barter, posting.currency, posting.price);
  return `New collab opportunity for${posting.gender ? ` ${posting.gender}` : ""} creators!

${posting.title}

${price ? `${price}` : ""}${
    posting.minimumFollowers
      ? `
Followers: >${convertToAbbreviation(posting.minimumFollowers)}`
      : ""
  }${
    posting.minimumAge || posting.maximumAge
      ? `
Age: ${getAgeGroup(posting.minimumAge, posting.maximumAge)}`
      : ""
  }${
    locationNames.length > 0
      ? `
Location: ${locationNames.join(", ")}`
      : ""
  }

Apply now 🚀 ${getRoute("Campaigns")}/${posting.id}`;
}
