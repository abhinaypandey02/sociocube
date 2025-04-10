import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const usernames = req.nextUrl.searchParams.get("username");
  usernames?.split(",").forEach((username) => {
    revalidateTag(`profile-${username}`);
  });
  return new NextResponse();
};
