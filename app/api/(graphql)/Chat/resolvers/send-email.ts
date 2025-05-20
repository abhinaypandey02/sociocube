import { db } from "@backend/lib/db";
import { waitUntil } from "@vercel/functions";
import { eq } from "drizzle-orm";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { UserTable } from "../../User/db";

export async function handleSendEmail(
  recipientId: number,
  senderId: number,
  messageBody: string
): Promise<void> {
  try {
    const [recipient] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, recipientId))
      .limit(1);

    const [sender] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, senderId))
      .limit(1);

    const messagePreview =
      messageBody.length > 100
        ? `${messageBody.substring(0, 97)} ...`
        : messageBody;

    if (recipient && sender) {
      waitUntil(
        sendTemplateEmail(recipient.email, "MessageReceived", {
          senderName: sender.name || "",
          messagePreview,
          senderUsername: sender.username || "",
        })
      );
    }
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}