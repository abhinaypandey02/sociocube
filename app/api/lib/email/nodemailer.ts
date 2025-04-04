import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string,
) {
  if (to.endsWith("sociocube.com")) return;
  return transporter.sendMail({
    from: {
      name: "Sociocube",
      address: "info@mail.sociocube.com",
    },
    subject,
    to,
    html,
    text,
  });
}
