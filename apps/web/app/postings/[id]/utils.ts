import type { GetPostingQuery } from "../../../__generated__/graphql";
import { getAgeGroup, getCurrency } from "../utils";
import { convertToAbbreviation } from "../../../lib/utils";
import { getRoute } from "../../../constants/routes";

export function getShareText(posting: NonNullable<GetPostingQuery["posting"]>) {
  return `*${posting.title}*
by ${posting.user?.name}
        
*About*
${posting.description}
           
${
  posting.deliverables
    ? `*Deliverables*
${posting.deliverables.map((deliverable) => `- ${deliverable}`).join("\n") || ""}`
    : ""
}
        
*Platform*
${posting.platforms.join(", ")}
        
*Payment*
${getCurrency(posting.barter, posting.currency, posting.price)}
        
${
  posting.minimumFollowers
    ? `*Minimum followers*
${convertToAbbreviation(posting.minimumFollowers)}
`
    : ""
}
${
  posting.minimumAge || posting.maximumAge
    ? `
*Age group*

${getAgeGroup(posting.minimumAge, posting.maximumAge)}`
    : ""
}
Apply now at: ${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}${getRoute("Postings")}/${posting.id}`;
}
