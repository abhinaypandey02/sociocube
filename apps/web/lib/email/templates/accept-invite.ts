export const AcceptInvite = ({
  link,
  type,
  agency,
}: {
  link: string;
  type: string;
  agency: string;
}) => ({
  subject: `Become the ${type} of ${agency} on Sociocube!`,
  text: `Hey!
You have been invited to become the ${type} of ${agency} on Sociocube.
Please click on the link below to accept the invitation.
${link}
Regards
Team Sociocube
  `,
  html: `<p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hey!</p>
<p style="font-size: 16px; color: #555; margin-bottom: 5px;">You have been invited to become the ${type} of ${agency} on Sociocube.</p>
<p style="font-size: 16px; color: #555; margin-bottom: 20px;">Please click on the link below to accept the invitation.</p>
<a href="${link}">${link}</a>
<p style="font-size: 16px; color: #555; margin-top: 24px;">Regards</p>
<p style="font-size: 16px; color: #555; margin-top: 5px;">Team Sociocube</p>
`,
});
