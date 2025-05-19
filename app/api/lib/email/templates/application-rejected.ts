import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const ApplicationRejected = ({
  campaignName,
  brandName,
}: {
  campaignName: string;
  brandName: string;
}) => ({
  subject: `Update on Your Application for "${campaignName}"`,
  title: "Application Status Update",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
We wanted to let you know that ${brandName} has reviewed your application for the "${campaignName}" campaign and has decided to move forward with other influencers at this time.`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `Don't Be Discouraged!`,
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `This decision doesn't reflect on your talent or content quality. Brands often have specific requirements or are looking for a particular style that may change from campaign to campaign.`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Keep applying to other campaigns that match your interests",
        "Update your profile to showcase your latest work",
        "Check out new campaign opportunities on your dashboard",
      ],
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Explore More Campaigns`,
      url: getRoute("Campaigns"),
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team by replying to this email.
      
We're confident you'll find great collaborations soon!`,
    },
  ] as EmailComponent[],
});
