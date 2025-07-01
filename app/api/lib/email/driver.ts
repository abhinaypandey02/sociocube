import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  emails: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }[],
) {
  if (emails.length > 1) {
    return resend.batch.send(
      emails.slice(0, 100).map((data) => ({
        from: "Sociocube <info@mail.sociocube.com>",
        replyTo: "hello@sociocube.com",
        ...data,
      })),
    );
  }
  const email = emails[0];
  if (
    email &&
    !(email.to.startsWith("test") && email.to.endsWith("sociocube.com"))
  )
    return resend.emails.send({
      from: "Sociocube <info@mail.sociocube.com>",
      to: email.to,
      subject: email.subject,
      text: email.text,
      html: email.html,
      replyTo: "hello@sociocube.com",
    });
}
