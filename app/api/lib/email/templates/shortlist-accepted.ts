import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

export const ShortlistAccepted = ({
  campaignName,
  influencerName,
  influencerUsername,
}: {
  campaignName: string;
  influencerName: string;
  influencerUsername: string;
}) => ({
  subject: `${influencerName} Has Accepted Your Shortlist for "${campaignName}"`,
  title: "Shortlist Accepted",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there,
      
Good news! ${influencerName} (@${influencerUsername}) has accepted your shortlist invitation for the "${campaignName}" campaign. 🎉`,
    },
    {
      type: EmailComponentType.HEADING,
      content: `Next Steps`,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Review the influencer's profile and content",
        "Reach out to discuss campaign details and expectations",
        "Finalize the collaboration agreement",
      ],
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `It's recommended to contact the influencer soon to maintain momentum and ensure they remain engaged with your campaign.`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `View Campaign Details`,
      url: `/your-campaigns`,
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.PARAGRAPH,
      content: `If you have any questions or need assistance with managing your campaign, please don't hesitate to contact our support team by replying to this email.
      
We're excited to see this collaboration move forward!`,
    },
  ] as EmailComponent[],
});
