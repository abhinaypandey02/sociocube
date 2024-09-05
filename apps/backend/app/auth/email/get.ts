import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import {
  generateAccessToken,
  getTokenizedResponse,
  getUserIdFromRefreshToken,
} from "../../../lib/auth/token";
import { ErrorResponses } from "../../../lib/auth/error-responses";
import { UserTable } from "../../graphql/types/User/db/schema";
import { getUser } from "../../graphql/types/User/db/utils";

export const GET = async () => {
  const refresh = cookies().get("refresh")?.value;

  if (!process.env.REFRESH_KEY) return ErrorResponses.noRefreshKey;

  if (refresh) {
    const id = getUserIdFromRefreshToken(refresh);
    if (id) {
      const user = await getUser(eq(UserTable.id, id));
      if (user?.refreshTokens?.includes(refresh))
        return getTokenizedResponse(generateAccessToken(user.id));
    }
  }

  return getTokenizedResponse();
};
