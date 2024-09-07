import { NextRequest } from "next/server";
import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import { ErrorResponses } from "../../../../lib/auth/error-responses";
import {
  generateAccessToken,
  generateRefreshToken,
  getTokenizedResponse,
} from "../../../../lib/auth/token";
import { OTPTable, UserTable } from "../../../graphql/types/User/db/schema";
import { db } from "../../../../lib/db";
import { AuthScopes } from "../../../graphql/constants/scopes";

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as { phone?: string; otp?: string };
  if (!body.phone || !body.otp) return ErrorResponses.missingBodyFields;
  const [data] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.phone, body.phone))
    .leftJoin(OTPTable, eq(UserTable.otp, OTPTable.id));
  if (!data?.user || !data.otp?.id) return ErrorResponses.wrongCredentials;

  const otp = data.otp.code;

  if (otp && (await compare(body.otp, otp))) {
    await db.transaction(async (tx) => {
      if (!data.otp) {
        tx.rollback();
        return;
      }
      await tx
        .update(OTPTable)
        .set({ code: undefined })
        .where(eq(OTPTable.id, data.otp.id));
      return tx
        .update(UserTable)
        .set({
          scopes: Array.from(new Set(data.user.scopes).add(AuthScopes.PHONE)),
        })
        .where(eq(UserTable.id, data.user.id));
    });
    return getTokenizedResponse(
      generateAccessToken(data.user.id),
      generateRefreshToken(data.user.id),
    );
  }
  return ErrorResponses.wrongCredentials;
};
