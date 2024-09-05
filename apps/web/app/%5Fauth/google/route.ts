import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export const GET = (req: NextRequest) => {
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  const state = v4();
  const res = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google?state=${state}&redirectURL=${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL + (redirectURL || "")}`,
  );
  res.cookies.set("state", state, {
    httpOnly: true,
    secure: true,
  });
  return res;
};
