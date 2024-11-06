import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import {
  generateAccessToken,
  getTokenizedResponse,
} from "../../../lib/auth/token";
import { ErrorResponses } from "../../../lib/auth/error-responses";
import { AuthScopes } from "../../graphql/constants/scopes";
import { UserTable } from "../../graphql/types/User/db/schema";
import {
  createUser,
  getUser,
  updateRefreshTokenAndScope,
} from "../../graphql/types/User/db/utils";
import { verifyCaptcha } from "./utils";

export const POST = async (req: Request) => {
  const body = (await req.json()) as {
    email?: string;
    password?: string;
    name?: string;
    captchaToken?: string;
  };

  if (!body.email || !body.password || !body.captchaToken)
    return ErrorResponses.missingBodyFields;
  if (!(await verifyCaptcha(body.captchaToken)))
    return ErrorResponses.invalidCaptcha;
  const existingUser = await getUser(eq(UserTable.email, body.email));
  if (existingUser) return ErrorResponses.alreadyExists;

  const encryptedPassword = await hash(body.password, 10);
  const newUser = await createUser({
    ...body,
    refreshTokens: [],
    scopes: [AuthScopes.EMAIL],
    password: encryptedPassword,
    roles: [],
  });

  if (newUser) {
    const refreshToken = await updateRefreshTokenAndScope(newUser.id, []);
    return getTokenizedResponse(generateAccessToken(newUser.id), refreshToken);
  }
  return getTokenizedResponse();
};
