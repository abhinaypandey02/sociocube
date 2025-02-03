export const VerifyEmail = ({
  firstName,
  link,
}: {
  firstName: string;
  link: string;
}) => ({
  subject: `Verify your email ${firstName}!`,
  text: `Hey ${firstName}!
We need to verify that this email belongs to you.
If you recently signed up on our platform (Within last 1 hour), then please open the link below to confirm the verification
${link}
Please ignore if you haven't signed up on our platform!

Regards
Team Sociocube
  `,
  body: `<p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hey ${firstName}!</p>
<p style="font-size: 16px; color: #555; margin-bottom: 5px;">We need to verify that this email belongs to you</p>
<p style="font-size: 16px; color: #555; margin-bottom: 20px;">If you recently signed up on our platform (Within last 1 hour), then please open the link below to confirm the verification</p>
<a href="${link}">${link}</a>
<p style="font-size: 16px; color: #555; margin-top: 20px;">Please ignore if you haven't requested a password reset!</p>
<p style="font-size: 16px; color: #555; margin-top: 24px;">Regards</p>
<p style="font-size: 16px; color: #555; margin-top: 5px;">Team Sociocube</p>
`,
});
