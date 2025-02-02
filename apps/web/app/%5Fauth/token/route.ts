import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const refresh = req.nextUrl.searchParams.get("refresh");
  const newState = req.nextUrl.searchParams.get("csrf_token");
  const error = req.nextUrl.searchParams.get("error");
  const oldState = req.cookies.get("csrf_token")?.value;
  const redirectURL = req.cookies.get("redirectURL")?.value;
  const res = NextResponse.redirect(
    (redirectURL || process.env.NEXT_PUBLIC_FRONTEND_BASE_URL) +
      (error ? `?error=${error}` : ""),
  );
  if (refresh && process.env.NEXT_PUBLIC_FRONTEND_BASE_URL) {
    res.cookies.set("redirectURL", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });
    res.cookies.set("csrf_token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });
    if (oldState === newState) {
      res.cookies.set("refresh", refresh, {
        httpOnly: true,
        secure: true,
      });
    }
  }
  return res;
};
