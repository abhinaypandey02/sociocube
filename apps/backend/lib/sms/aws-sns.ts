// import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
//
// const REGION_NAME = process.env.AWS_REGION!;
// const client = new SNSClient({
//   region: REGION_NAME,
// });
// export async function sendSMS(text: string, phone: string) {
//   return client.send(
//     new PublishCommand({
//       Message: text,
//       PhoneNumber: phone,
//     }),
//   );
// }
