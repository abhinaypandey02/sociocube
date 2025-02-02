export const VerifyEmail = ({
  email,
  link,
}: {
  email: string;
  link: string;
}) => ({
  subject: `Welcome to Sociocube ${email}!`,
  body: link,
  text: link,
});
