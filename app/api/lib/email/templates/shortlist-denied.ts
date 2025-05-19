import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const ShortlistDenied = ({
  campaignName,
  campaignID,
  influencerName,
  influencerUsername,
}: {
  campaignName: string;
  campaignID: number;
  influencerName: string;
  influencerUsername: string;
}) => ({
  subject: `${influencerName} Has Declined Your Shortlist for "${campaignName}"`,
  title: "Shortlist Declined",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
We wanted to let you know that ${influencerName} (@${influencerUsername}) has declined your shortlist invitation for the "${campaignName}" campaign.`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `Don't Worry - Here's What You Can Do Next`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Review other applications for your campaign",
        "Shortlist additional influencers who match your requirements",
        "Consider adjusting your campaign details to attract more applicants",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Influencers may decline invitations for various reasons including scheduling conflicts, content fit, or other commitments. This doesn't reflect on your campaign's quality.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Find More Influencers`,
      url: `${getRoute("YourCampaigns")}/${campaignID}/applications`,
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you need help finding the right influencers for your campaign or have any questions, please don't hesitate to contact our support team by replying to this email.
      
We're here to help you make your campaign a success!`,
    },
  ] as EmailComponent[],
});
