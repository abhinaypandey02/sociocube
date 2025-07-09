import { db } from "@backend/lib/db";
import { and, eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";

import GQLError from "@/app/api/lib/constants/errors";

import { PostingAccessTable } from "../db";

export async function getInvitationDetail(token: string) {
  const decoded = verify(token, process.env.SIGNING_KEY!) as {
    id: number;
  };

  if (!decoded) {
    throw GQLError(400, "Invalid invitation token");
  }

  // Find the access record
  const [access] = await db
    .select()
    .from(PostingAccessTable)
    .where(and(eq(PostingAccessTable.id, decoded.id)));

  // Return the access details
  return access;
}
