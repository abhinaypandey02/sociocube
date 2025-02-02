import { and, eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../../User/db/schema";
import { RequestTable, RequestType } from "../../db/schema";
import { sendTemplateEmail } from "../../../../../../lib/email/template";
import GQLError from "../../../../constants/errors";

function getVerifyLink(id: number) {
  const token = sign({ id }, process.env.SIGNING_KEY || "", {
    expiresIn: "1h",
  });
  return `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/verify/${token}`;
}

export async function handleSendVerificationEmail(userID: number) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, userID));
  if (!user) return null;
  if (user.emailVerified) throw GQLError(400, "Email already verified");
  if (!user.email) throw GQLError(400, "No email associated");
  const [res] = await db
    .select()
    .from(RequestTable)
    .where(
      and(
        eq(RequestTable.user, user.id),
        eq(RequestTable.type, RequestType.VerifyEmail),
      ),
    );
  if (res) {
    if (res.attempts >= 2) return null;
    if (new Date().getTime() - res.createdAt.getTime() < 3600000) {
      await sendTemplateEmail(user.email, "VerifyEmail", {
        email: user.email,
        link: getVerifyLink(res.id),
      });
      await db.update(RequestTable).set({ attempts: res.attempts + 1 });
      return null;
    }
    await db.delete(RequestTable).where(eq(RequestTable.id, res.id));
  }
  const [inserted] = await db
    .insert(RequestTable)
    .values({ user: user.id, type: RequestType.VerifyEmail })
    .returning();
  if (!inserted) return null;
  await sendTemplateEmail(user.email, "VerifyEmail", {
    email: user.email,
    link: getVerifyLink(inserted.id),
  });
  return null;
}
