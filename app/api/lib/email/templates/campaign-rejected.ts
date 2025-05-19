import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

import { getRoute } from "@/constants/routes";

export const CampaignRejected = ({
  campaignName,
  reason,
}: {
  campaignName: string;
  reason: string;
}) => ({
  subject: `Important Update About Your Campaign "${campaignName}"`,
  title: "Campaign Review Feedback",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
We've completed the review of your campaign "${campaignName}" and found that some aspects need adjustment before it can go live on our platform.`,
    },
    ...(reason
      ? [
          {
            type: EmailComponentType.HEADING,
            content: `Review Feedback`,
          },
          {
            type: EmailComponentType.PARAGRAPH,
            content: `${reason}`,
          },
        ]
      : []),
    {
      type: EmailComponentType.HEADING,
      content: `Next Steps`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Review the feedback provided above",
        "Make the necessary adjustments to your campaign",
        "Resubmit a new campaign for another review",
      ],
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Create new campaign`,
      url: getRoute("NewCampaign"),
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Don't worry! This is a common part of the process, and many successful campaigns go through revisions.`,
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions about the feedback or need assistance with your revisions, our support team is here to help. Simply reply to this email, and we'll get back to you as soon as possible.
      
We look forward to seeing your revised campaign!`,
    },
  ] as EmailComponent[],
});
