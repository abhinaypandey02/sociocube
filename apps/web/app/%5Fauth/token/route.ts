import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const refresh = req.nextUrl.searchParams.get("refresh");
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  const newState = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");
  const oldState = req.cookies.get("state")?.value;
  if (refresh && process.env.NEXT_PUBLIC_FRONTEND_BASE_URL) {
    const res = NextResponse.redirect(
      redirectURL ||
        process.env.NEXT_PUBLIC_FRONTEND_BASE_URL +
          (error ? `?error=${error}` : ""),
    );
    if (oldState === newState) {
      res.cookies.set("refresh", refresh, {
        httpOnly: true,
        secure: true,
      });
      res.cookies.set("state", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
      });
    }
    return res;
  }
};
