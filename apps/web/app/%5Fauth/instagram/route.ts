import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const redirectURL = req.nextUrl.searchParams.get("redirectURL");
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/instagram?redirectURL=${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL + (redirectURL || "")}`,
  );
};
