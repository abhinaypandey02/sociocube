import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { ErrorResponses } from "../../../lib/auth/error-responses";
import {
  createUser,
  getUser,
  updateRefreshTokenAndScope,
} from "../../graphql/types/User/db/utils";
import { AuthScopes } from "../../graphql/constants/scopes";
import { getUserIdFromRefreshToken } from "../../../lib/auth/token";
import { UserTable } from "../../graphql/types/User/db/schema";
import { getGraphUrl, getInstagramAuthorizationUrl } from "./utils";

export const GET = async (req: NextRequest) => {
  const accessToken = req.nextUrl.searchParams.get("access_token");
  const expiresIn = req.nextUrl.searchParams.get("expires_in");
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  const refresh = req.cookies.get("refresh")?.value;
  if (!redirectURL) return ErrorResponses.missingBodyFields;
  if (accessToken && expiresIn) {
    if (parseInt(expiresIn) < 1) return ErrorResponses.expired;
    const accountsResponse = await fetch(
      getGraphUrl("/me/accounts", accessToken),
    );
    const accountsResult = (await accountsResponse.json()) as {
      data?: { id?: string }[];
    };
    const id = accountsResult.data?.[0]?.id;
    const userResponse = await fetch(
      getGraphUrl(`/${id}`, accessToken, {
        fields: ["instagram_business_account"],
      }),
    );

    const userResult = (await userResponse.json()) as { id?: string };
    const instagramBusinessId = userResult.id;
    if (!instagramBusinessId) return ErrorResponses.internalServerError;
    const loggedInUserID = getUserIdFromRefreshToken(refresh);
    const existingUser = await getUser(
      eq(UserTable.instagramBusinessId, instagramBusinessId),
    );
    let refreshToken;
    if (existingUser && loggedInUserID) {
      return NextResponse.redirect(
        `${redirectURL}?error=Can't merge account, as it's already being used`,
      );
    } else if (existingUser) {
      refreshToken = await updateRefreshTokenAndScope(
        existingUser.id,
        existingUser.refreshTokens,
        Array.from(new Set(existingUser.scopes).add(AuthScopes.INSTAGRAM)),
      );
    } else if (loggedInUserID) {
      const loggedInUser = await getUser(eq(UserTable.id, loggedInUserID));
      if (loggedInUser) {
        refreshToken = await updateRefreshTokenAndScope(
          loggedInUser.id,
          loggedInUser.refreshTokens,
          Array.from(new Set(loggedInUser.scopes).add(AuthScopes.INSTAGRAM)),
          {
            instagramBusinessId,
          },
        );
      }
    } else {
      const personalInfoResponse = await fetch(
        getGraphUrl(`/${instagramBusinessId}`, accessToken, {
          fields: ["name"],
        }),
      );
      const personalInfo = (await personalInfoResponse.json()) as {
        name: string;
      };
      if (personalInfo.name) {
        const newUser = await createUser({
          name: personalInfo.name,
          refreshTokens: [],
          instagramBusinessId,
          scopes: [AuthScopes.INSTAGRAM],
          roles: [],
        });
        if (newUser)
          refreshToken = await updateRefreshTokenAndScope(newUser.id, []);
      } else {
        return ErrorResponses.expired;
      }
    }
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/_auth/token?refresh=${refreshToken}&redirectURL=${redirectURL}`,
    );
  }
  return NextResponse.redirect(getInstagramAuthorizationUrl(redirectURL));
};
