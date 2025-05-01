import { NextRequest } from "next/server";

export const GET = (req: NextRequest) => {
  const url = req.nextUrl.search.split("url=")[1];
  if (!url) return new Response("No URL provided", { status: 400 });
  return fetch(url);
};
