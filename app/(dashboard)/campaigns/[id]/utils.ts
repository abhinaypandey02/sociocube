import type { GetPostingQuery } from "@/__generated__/graphql";
import { convertToAbbreviation } from "@/lib/utils";
import { getRoute } from "@/constants/routes";
import { getAgeGroup, getCurrency } from "../utils";

export function getShareText(posting: NonNullable<GetPostingQuery["posting"]>) {
  return `*${posting.title}*
        
*About* 📝
${posting.description}
           
${
  posting.deliverables
    ? `*Deliverables* 📦
${posting.deliverables.map((deliverable) => `- ${deliverable.trim()}`).join("\n") || ""}`
    : ""
}
        
*Platform* 📱
${posting.platforms.join(", ")}
        
*Payment* 💳
${getCurrency(posting.barter, posting.currency, posting.price)}
        
${
  posting.minimumFollowers
    ? `*Minimum followers* 📈
${convertToAbbreviation(posting.minimumFollowers)}
`
    : ""
}
${
  posting.minimumAge || posting.maximumAge
    ? `
*Age group* 🎂

${getAgeGroup(posting.minimumAge, posting.maximumAge)}`
    : ""
}
Apply now 🚀 ${getRoute("Postings")}/${posting.id}`;
}
