import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  emails: string[],
  subject: string,
  bodyText: string,
  bodyHTML?: string,
) {
  return resend.emails.send({
    from: "info@mail.sociocube.com",
    to: emails.filter(
      (email) => !(email.startsWith("test") && email.endsWith("sociocube.com")),
    ),
    subject,
    text: bodyText,
    html: bodyHTML,
    replyTo: "hello@sociocube.com",
  });
}
