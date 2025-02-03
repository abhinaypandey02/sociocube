export const ResetPassword = ({
  firstName,
  link,
}: {
  firstName: string;
  link: string;
}) => ({
  subject: `Reset your password!`,
  text: `Hey ${firstName}!
We received request to reset your password!  
Please click on the link below to reset your password.
${link}
Please ignore if you haven't requested a password reset!

Regards
Team Sociocube
  `,
  html: `<p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hey ${firstName}!</p>
<p style="font-size: 16px; color: #555; margin-bottom: 5px;">We received request to reset your password!</p>
<p style="font-size: 16px; color: #555; margin-bottom: 20px;">Please click on the link below to reset your password.</p>
<a href="${link}">${link}</a>
<p style="font-size: 16px; color: #555; margin-top: 20px;">Please ignore if you haven't requested a password reset!</p>
<p style="font-size: 16px; color: #555; margin-top: 24px;">Regards</p>
<p style="font-size: 16px; color: #555; margin-top: 5px;">Team Sociocube</p>
`,
});
