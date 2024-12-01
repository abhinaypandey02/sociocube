export const WelcomeUser = ({ firstName }: { firstName: string }) => ({
  subject: `Welcome to Freeluencers  ${firstName}! Let’s Get You Started 🚀!`,
  text: `Hi ${firstName}!,
Welcome to Freeluencers! 🎉 We’re thrilled to have you onboard as part of our growing community of influencers. 🌟

You’re just one step away from unlocking brand collaborations and showcasing your potential to the world. Here’s how to complete your onboarding:

Quick Steps to Finish Onboarding:
Log in to Your Account: Click here to log in
Complete Your Profile: Add your details and link your Instagram account.
Start Connecting: Once your profile is live, brands can discover you for stories, reels, posts, and more!
Why complete your onboarding?
✅ Get visible to top brands actively looking for influencers.
✅ Save time—let brands come to you.
✅ 100% free for early users like you.

Need help? We’re here for you! Reply to this email or check out our support page.

Ready to shine? Start now and make the most of your influencer journey.

Warm regards,
The Freeluencers Team
freeluencers.com`,
  html: `
  <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hi ${firstName},</p>
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Welcome to Freeluencers! 🎉 We’re thrilled to have you onboard as part of our growing community of influencers. 🌟</p>
        <h2 style="font-size: 18px; color: #333; margin-top: 20px; margin-bottom: 10px;">Quick Steps to Finish Onboarding:</h2>
        <ol style="font-size: 16px; color: #555; padding-left: 25px; margin-bottom: 20px;">
          <li> 
            <strong>Log in to Your Account:</strong> 
            <a href="https://freeluencers.com/login" style="color: #007bff; text-decoration: none;">Click here to log in</a>
          </li>
          <li><strong>Complete Your Profile:</strong> Add your details and link your Instagram account.</li>
          <li><strong>Start Connecting:</strong> Once your profile is live, brands can discover you for stories, reels, posts, and more!</li>
        </ol>
        <h2 style="font-size: 18px; color: #333; margin-top: 20px; margin-bottom: 10px;">Why complete your onboarding?</h2>
        <ul style="font-size: 16px; color: #555; padding-left: 0px; margin-bottom: 20px;list-style-type: none;">
          <li>✅ <strong>Get visible to top brands</strong> actively looking for influencers.</li>
          <li>✅ <strong>Save time</strong>—let brands come to you.</li>
          <li>✅ <strong>100% free</strong> for early users like you.</li>
        </ul>
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Need help? We’re here for you! Reply to this email!
        </p>
        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Ready to shine? Start now and make the most of your influencer journey.</p>
        <p style="font-size: 16px; color: #555;">Warm regards,</p>
        <p style="font-size: 16px; color: #555;"><strong>The Freeluencers Team</strong></p>
        <p style="font-size: 16px; color: #555;">
          <a href="https://freeluencers.com" style="color: #007bff; text-decoration: none;">freeluencers.com</a>
        </p>
  `,
});
