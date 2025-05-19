import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getCurrency } from "@/app/(dashboard)/campaigns/utils";
import { getRoute } from "@/constants/routes";

export const NewCampaigns = ({
  influencerName,
  campaigns,
}: {
  influencerName?: string;
  campaigns: Array<{
    id: number;
    title: string;
    barter: boolean;
    currency?: string | null;
    price?: number | null;
  }>;
}) => ({
  subject: `New Campaigns Matched for You!`,
  title: "New Campaigns Just for You",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi ${influencerName || "there"},

We've found some new campaigns that match your profile! 🎉 Check out these opportunities that might be perfect for you:`,
    },
    {
      type: EmailComponentType.LIST,
      items: campaigns.map((campaign) => {
        const price = getCurrency(
          campaign.barter,
          campaign.currency,
          campaign.price,
        );
        return `<a href="/campaigns/${campaign.id}">${campaign.title}</a> ${price ? `(${price})` : ""}`;
      }),
    },
    {
      type: EmailComponentType.HEADING,
      content: `Why These Campaigns?`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Matched to your profile and interests",
        "Selected based on your follower count and engagement rate",
        "Opportunities with brands looking for influencers like you",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Don't miss out on these opportunities! Log in to your dashboard to apply or see more details about each campaign.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Go to Dashboard`,
      url: getRoute("Campaigns"),
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team by replying to this email.

Happy collaborating!`,
    },
  ] as EmailComponent[],
});
