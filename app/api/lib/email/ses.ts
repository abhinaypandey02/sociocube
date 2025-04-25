import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const REGION_NAME = process.env.SITE_AWS_REGION || "";

const client = new SESClient({
  region: REGION_NAME,
  credentials: {
    accessKeyId: process.env.SITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SITE_AWS_SECRET_ACCESS_KEY || "",
  },
});
export async function sendEmail(
  emails: string[],
  subject: string,
  bodyText: string,
  bodyHTML?: string,
) {
  return client.send(
    new SendEmailCommand({
      Message: {
        Body: {
          Text: {
            Data: bodyText,
          },
          Html: {
            Data: bodyHTML,
          },
        },
        Subject: {
          Data: subject,
        },
      },
      Destination: {
        ToAddresses: emails,
      },
      Source: "info@mail.sociocube.com",
    }),
  );
}
