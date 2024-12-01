import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
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
  return transporter.sendMail({
    from: { name: "Freeluencers", address: process.env.NODEMAILER_EMAIL || "" },
    subject,
    to,
    html,
    text,
  });
}
