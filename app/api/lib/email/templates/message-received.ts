import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const MessageReceived = ({
  senderName,
  messagePreview,
  senderUsername,
}: {
  senderName: string;
  messagePreview: string;
  senderUsername: string;
}) => ({
  subject: `New Message from ${senderName}`,
  title: "A New Message Has Been Received",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
You've received a new message from ${senderName}. 📩`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `Message Preview`,
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `"${messagePreview}"`,
      options: {
        italic: true,
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `To view the full message and reply, click the button below:`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `View Message`,
      url: `${getRoute("Inbox")}/${senderUsername}`,
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team.
      
Thank you for using Sociocube!`,
    },
  ] as EmailComponent[],
});
