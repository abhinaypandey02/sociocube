import { waitUntil } from "@vercel/functions";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

import { HandleImageUploadType } from "@/lib/utils";

import { UserTable } from "../../(graphql)/User/db";
import { getCurrentUser } from "../../(graphql)/User/utils";
import { context } from "../../lib/auth/context";
import { db } from "../../lib/db";
import { deleteImage, getFileURL, uploadFile } from "../../lib/storage/aws-s3";

export const PUT = async (req: NextRequest) => {
  const ctx = await context(req);
  if (!ctx.userId)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const rawKey = searchParams.get("key");
  const key = rawKey ? (parseInt(rawKey) as HandleImageUploadType) : undefined;
  const sync = Boolean(searchParams.get("sync"));
  const formData = await req.formData();
  const file = formData.get("file") as File | undefined;

  const imageKey = v4();
  const url = file ? getFileURL(imageKey) : null;

  const handleKeyProcessing = async () => {
    if (file) await uploadFile(file, imageKey);
    switch (key) {
      default:
        waitUntil(
          (async () => {
            if (!ctx.userId) return;
            const user = await getCurrentUser(ctx);
            if (!user && url) {
              await deleteImage(url);
              return;
            }
            if (user?.photo) {
              await deleteImage(user.photo);
            }
            await db
              .update(UserTable)
              .set({ photo: url })
              .where(eq(UserTable.id, ctx.userId));
          })(),
        );
    }
  };

  if (!sync) {
    waitUntil(handleKeyProcessing());
  } else {
    await handleKeyProcessing();
  }
  return new NextResponse(url);
};
