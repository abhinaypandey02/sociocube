// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
//
// const REGION_NAME = process.env.AWS_REGION!;
// const client = new SESClient({
//   region: REGION_NAME,
// });
// export async function sendEmail(
//   emails: string[],
//   subject: string,
//   bodyText: string,
//   bodyHTML?: string,
// ) {
//   return client.send(
//     new SendEmailCommand({
//       Message: {
//         Body: {
//           Text: {
//             Data: bodyText,
//           },
//           Html: {
//             Data: bodyHTML,
//           },
//         },
//         Subject: {
//           Data: subject,
//         },
//       },
//       Destination: {
//         ToAddresses: emails,
//       },
//       Source: "abhinaypandey02@gmail.com",
//     }),
//   );
// }
