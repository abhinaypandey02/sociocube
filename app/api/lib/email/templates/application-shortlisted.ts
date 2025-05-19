import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const ApplicationShortlisted = ({
  campaignName,
  brandName,
}: {
  campaignName: string;
  brandName: string;
}) => ({
  subject: `You've Been Shortlisted for "${campaignName}"!`,
  title: "You've Been Shortlisted!",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
Great news! ${brandName} has shortlisted you for the "${campaignName}" campaign. 🎉`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `Action Required: Accept or Decline`,
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Being shortlisted means the brand is interested in working with you, but you need to confirm your interest and availability for this campaign.`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Review the campaign details carefully",
        "Accept the shortlist if you're interested and available",
        "Or decline if you're not available or interested at this time",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Please respond promptly as the brand is waiting for your decision. This opportunity will remain open for a limited time.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Review & Respond`,
      url: getRoute("Applications"),
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions about the campaign before making your decision, please don't hesitate to contact our support team by replying to this email.
      
We look forward to your response!`,
    },
  ] as EmailComponent[],
});
