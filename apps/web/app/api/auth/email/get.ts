import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import {
  generateAccessToken,
  getTokenizedResponse,
  getUserIdFromRefreshToken,
} from "../../lib/auth/token";
import { ErrorResponses } from "../../lib/auth/error-responses";
import { UserTable } from "../../graphql/types/User/db/schema";
import { getUser } from "../../graphql/types/User/db/utils";

export async function checkRefreshToken(refresh?: string) {
  if (refresh) {
    const id = getUserIdFromRefreshToken(refresh);
    if (id) {
      const user = await getUser(eq(UserTable.id, id));
      if (user?.refreshTokens?.includes(refresh)) return user.id;
    }
  }
  return null;
}

export const GET = async (req: NextRequest) => {
  const refresh = req.cookies.get("refresh")?.value;

  if (!process.env.REFRESH_KEY) return ErrorResponses.noRefreshKey;
  const userID = await checkRefreshToken(refresh);
  if (userID) return getTokenizedResponse(generateAccessToken(userID));

  return getTokenizedResponse();
};
