import { EmailComponent, EmailComponentType } from "@backend/lib/email/types";

export const WelcomeUser = ({ verifyLink }: { verifyLink: string }) => ({
  subject: `Verify your email! Welcome to Sociocube!`,
  title: "Welcome to Sociocube",
  components: [
    {
      type: EmailComponentType.PARAGRAPH,
      content: `Hi there
Welcome to Sociocube! 🎉 We’re thrilled to have you onboard as part of our growing community of influencers. 🌟
      
Let's start by verifying your email. Click on the link below to verify your email:`,
    },
    {
      type: EmailComponentType.BUTTON,
      content: `Verify your email`,
      url: verifyLink,
      options: {
        align: "center",
      },
    },
    {
      type: EmailComponentType.HEADING,
      content: `Quick Steps to Finish Onboarding`,
      url: verifyLink,
    },
    {
      type: EmailComponentType.LIST,
      items: [
        "Log in to Your Account: Click here to log in",
        "Complete Your Profile: Add your details and link your Instagram account.",
        "Start Connecting: Once your profile is live, brands can discover you for stories, reels, posts, and more!",
      ],
    },
    {
      type: EmailComponentType.HEADING,
      content: `Why complete your onboarding?`,
      url: verifyLink,
    },

    {
      type: EmailComponentType.LIST,
      items: [
        "Get visible to top brands actively looking for influencers.",
        "Save time—let brands come to you.",
        "100% free for early users like you.",
      ],
    },

    {
      type: EmailComponentType.PARAGRAPH,
      content: `Need help? We’re here for you! Reply to this email or check out our support page.

Ready to shine? Start now and make the most of your influencer journey.`,
    },
  ] as EmailComponent[],
});
