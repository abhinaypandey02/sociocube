import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { ErrorResponses } from "../../../../lib/auth/error-responses";
import { getUser } from "../../../graphql/types/User/db/utils";
import { sendOtp } from "../../../../lib/auth/send-otp";
import { AuthScopes } from "../../../graphql/constants/scopes";
import { db } from "../../../../lib/db";
import { OTPTable, UserTable } from "../../../graphql/types/User/db/schema";
import { verifyCaptcha } from "../../email/utils";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as { phone?: string; captchaToken?: string };
  if (!body.phone || !body.captchaToken)
    return ErrorResponses.missingBodyFields;
  if (!(await verifyCaptcha(body.captchaToken)))
    return ErrorResponses.invalidCaptcha;
  const user = await getUser(eq(UserTable.phone, body.phone));
  const otpCode = Math.floor(100000 + Math.random() * 900000);
  const hashedOtp = await hash(otpCode.toString(), 10);
  if (!user?.otp) {
    await db.transaction(async (tx) => {
      const [otp] = await tx
        .insert(OTPTable)
        .values({
          code: hashedOtp,
          requestedAt: new Date(),
        })
        .returning({ id: OTPTable.id });
      if (otp)
        if (!user) {
          const [newUser] = await tx
            .insert(UserTable)
            .values({
              phone: body.phone,
              otp: otp.id,
              refreshTokens: [],
              scopes: [AuthScopes.PHONE],
              roles: [],
            })
            .returning({ id: UserTable.id });
          if (!newUser) {
            tx.rollback();
            return;
          }
          await tx
            .update(UserTable)
            .set({ username: newUser.id.toString() })
            .where(eq(UserTable.id, newUser.id));
        } else
          await tx
            .update(UserTable)
            .set({ otp: otp.id })
            .where(eq(UserTable.id, user.id));
    });
  } else {
    await db
      .update(OTPTable)
      .set({
        code: hashedOtp,
        requestedAt: new Date(),
      })
      .where(eq(OTPTable.id, user.otp));
  }
  sendOtp(body.phone, otpCode);
  return new NextResponse();
};
