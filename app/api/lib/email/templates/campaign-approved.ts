import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const CampaignApproved = ({
  campaignName,
  campaignID,
}: {
  campaignName: string;
  campaignID: number;
}) => ({
  subject: `Congrats! Your Campaign "${campaignName}" is not live!`,
  title: "Campaign Approved Successfully",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
We're excited to let you know that your campaign "${campaignName}" has been reviewed and approved! 🎉`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `What Happens Next?`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Your campaign is now live on our platform",
        "Influencers can now view and apply to your campaign",
        "You'll receive notifications as applications come in",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `You can start reviewing applications as they arrive and select the perfect influencers for your campaign.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Manage Campaign`,
      url: `${getRoute("YourCampaigns")}/${campaignID}`,
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Need to make any adjustments to your campaign? You can still edit certain details by visiting your campaign dashboard.`,
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team by replying to this email.
      
Thank you for choosing Sociocube for your influencer marketing needs!`,
    },
  ] as EmailComponent[],
});
