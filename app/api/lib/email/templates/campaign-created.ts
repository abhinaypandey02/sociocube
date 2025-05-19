import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const CampaignCreated = ({
  campaignName,
  campaignID,
}: {
  campaignName: string;
  campaignID: number;
}) => ({
  subject: `Your Campaign "${campaignName}" Has Been Created`,
  title: "Campaign Created Successfully",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
We're excited to let you know that your campaign "${campaignName}" has been successfully created and is now in review. 🎉`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `What Happens Next?`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Our team is reviewing your campaign details",
        "We'll ensure everything meets our platform guidelines",
        "You'll receive a notification once the review is complete",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `The review process typically takes 24-48 hours. We appreciate your patience as we ensure your campaign is set up for success.`,
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Need to make changes? You can still edit your campaign while it's in review by visiting your dashboard.`,
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
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team by replying to this email.
      
Thank you for choosing Sociocube for your influencer marketing needs!`,
    },
  ] as EmailComponent[],
});
