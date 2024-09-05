import { NextResponse } from "next/server";

export const ErrorResponses = {
  noRefreshKey: new NextResponse("REFRESH_KEY not in server", {
    status: 500,
  }),
  alreadyExists: new NextResponse("Already exists", {
    status: 400,
  }),
  mergeError: new NextResponse(
    "Can't merge account, as it's already being used",
    {
      status: 400,
    },
  ),
  missingBodyFields: new NextResponse("Missing required fields", {
    status: 400,
  }),
  wrongCredentials: new NextResponse("Wrong credentials", {
    status: 403,
  }),
  invalidCaptcha: new NextResponse("Invalid captcha", {
    status: 403,
  }),
  wrongScope: new NextResponse("Wrong signin method", {
    status: 403,
  }),
  expired: new NextResponse("Token Expired", {
    status: 401,
  }),
  internalServerError: new NextResponse("Internal server error", {
    status: 500,
  }),
};
