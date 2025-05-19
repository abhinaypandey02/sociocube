import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const ApplicationSelected = ({
  campaignName,
  brandName,
}: {
  campaignName: string;
  brandName: string;
}) => ({
  subject: `Congratulations! Your Application for "${campaignName}" Has Been Selected`,
  title: "Application Selected",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
Great news! ${brandName} has selected your application for the "${campaignName}" campaign. 🎉`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `What's Next?`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "The brand will contact you soon with more details",
        "Prepare your content strategy for this campaign",
        "Ensure your contact information is up-to-date in your profile",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `This is an exciting opportunity to collaborate with ${brandName}. Make sure to respond promptly when they reach out to you.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `View Your Applications`,
      url: getRoute("Applications"),
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team by replying to this email.
      
Congratulations again on being selected for this campaign!`,
    },
  ] as EmailComponent[],
});
