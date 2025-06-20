import {
  generateAccessToken,
  generateRefreshToken,
  getTokenizedResponse,
} from "@backend/lib/auth/token";
import { db } from "@backend/lib/db";
import { UserTable } from "@graphql/User/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { username: string } },
) => {
  const [user] = await db
    .select({ id: UserTable.id })
    .from(UserTable)
    .where(eq(UserTable.username, params.username.replace("!@", "")));
  if (user)
    return getTokenizedResponse(
      generateAccessToken(user.id),
      generateRefreshToken(user.id),
    );
  return new NextResponse("Not found");
};
