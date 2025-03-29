import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import {
  generateAccessToken,
  getTokenizedResponse,
} from "../../lib/auth/token";
import { ErrorResponses } from "../../lib/auth/error-responses";
import { UserTable } from "@graphql/types/User/db/schema";
import {
  getUser,
  updateRefreshTokenAndScope,
} from "@graphql/types/User/db/utils";
import { verifyCaptcha } from "./utils";

export const PUT = async (req: Request) => {
  const body = (await req.json()) as {
    email?: string;
    password?: string;
    captchaToken?: string;
  };

  if (!body.email || !body.password || !body.captchaToken)
    return ErrorResponses.missingBodyFields;
  if (!(await verifyCaptcha(body.captchaToken)))
    return ErrorResponses.invalidCaptcha;
  const user = await getUser(eq(UserTable.email, body.email));
  if (!user) return ErrorResponses.wrongCredentials;

  if (
    user.password &&
    user.email &&
    (await compare(body.password, user.password))
  ) {
    const refreshToken = await updateRefreshTokenAndScope(
      user.id,
      user.refreshTokens,
    );
    return getTokenizedResponse(generateAccessToken(user.id), refreshToken);
  }
  return ErrorResponses.wrongCredentials;
};
