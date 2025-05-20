import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const PostingAnnouncement = ({
  brandName,
  postingName,
  postingId,
  username,
  announcementText,
}: {
  brandName: string;
  postingName: string;
  postingId: number;
  username: string;
  announcementText: string;
}) => ({
  subject: `Announcement from ${brandName} about "${postingName}"`,
  title: "Campaign Announcement",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
${brandName} has sent an announcement regarding the campaign "<a href="${getRoute("Campaigns")}/${postingId}">${postingName}</a>".`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `Announcement`,
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: announcementText,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `View Announcement`,
      url: `${getRoute("Inbox")}/${username}`,
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance, please don't hesitate to contact our support team by replying to this email.
      
Thank you for using Sociocube for your influencer marketing collaborations!`,
    },
  ] as EmailComponent[],
});
