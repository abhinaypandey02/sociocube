import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../lib/db";
import { UserTable } from "../../graphql/types/User/db/schema";
import { getCurrentUser } from "../../graphql/types/User/utils";
import { UserFieldResolver } from "../../graphql/types/User/resolvers/field";

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY || !process.env.AWS_BUCKET)
    return new NextResponse(null, { status: 403 });
  const data = await req.formData();
  const id = data.get("id") as string;
  const image = data.get("file") as File;
  if (id) {
    const user = await getCurrentUser({ userId: parseInt(id) });
    if (user) {
      if (user.photo?.includes(process.env.AWS_BUCKET))
        return new NextResponse("Custom image", { status: 500 });
      const uploadData = await new UserFieldResolver().pictureUploadURL(user);
      const res = await fetch(uploadData.uploadURL, {
        method: "PUT",
        body: image,
      });
      if (res.ok) {
        await db
          .update(UserTable)
          .set({
            photo: uploadData.url,
          })
          .where(eq(UserTable.id, parseInt(id)));
        return new NextResponse("Done", { status: 200 });
      }
    }
  }
}
