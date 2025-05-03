import type { GetPostingQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";

import { getAgeGroup, getCurrency } from "../utils";

export function getShareText(posting: NonNullable<GetPostingQuery["posting"]>) {
  const price = getCurrency(posting.barter, posting.currency, posting.price);
  return `New collab opportunity for creators!
  
${posting.title}

${price}${
    posting.minimumFollowers
      ? `
Followers: >${convertToAbbreviation(posting.minimumFollowers)}`
      : ""
  }${
    posting.minimumAge || posting.maximumAge
      ? `
Age: ${getAgeGroup(posting.minimumAge, posting.maximumAge)}`
      : ""
  }

Apply now 🚀 ${getRoute("Campaigns")}/${posting.id}`;
}
