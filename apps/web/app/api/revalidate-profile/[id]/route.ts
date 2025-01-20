import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getRoute } from "../../../../constants/routes";

export const GET = (req: NextRequest) => {
  const id = req.url.split("/").at(-1);
  revalidatePath(`/${getRoute("Profile")}/${id}`);
  return new NextResponse();
};
