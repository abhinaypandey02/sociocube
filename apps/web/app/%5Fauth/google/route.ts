import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export const GET = (req: NextRequest) => {
  const refresh = req.cookies.get("refresh")?.value;
  const csrfToken = v4();
  const res = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/google?csrf_token=${csrfToken}&refresh=${refresh}`,
  );
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  if (redirectURL)
    res.cookies.set(
      "redirectURL",
      process.env.NEXT_PUBLIC_FRONTEND_BASE_URL + redirectURL,
      {
        httpOnly: true,
        secure: true,
      },
    );
  res.cookies.set("csrf_token", csrfToken, {
    httpOnly: true,
    secure: true,
  });
  return res;
};
