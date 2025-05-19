import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const ApplicationReceived = ({
  campaignName,
  applicationCount,
  campaignID,
}: {
  campaignName: string;
  campaignID: number;
  applicationCount: number;
}) => ({
  subject: `Your Campaign "${campaignName}" Has Received ${applicationCount} Application${applicationCount !== 1 ? "s" : ""}`,
  title: "New Applications Received",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
Great news! Your campaign "${campaignName}" has received ${applicationCount} application${applicationCount !== 1 ? "s" : ""}. 🎉`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `What's Next?`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Review the applications in your dashboard",
        "Connect with potential influencers",
        "Select the best matches for your campaign",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Don't wait too long to respond - influencers are more likely to engage when you reach out promptly.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `View Applications`,
      url: `${getRoute("YourCampaigns")}/${campaignID}/applications`,
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team by replying to this email.
      
Thank you for using Sociocube for your influencer marketing campaigns!`,
    },
  ] as EmailComponent[],
});
