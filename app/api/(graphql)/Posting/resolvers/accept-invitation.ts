import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { and, eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";

import { UserTable } from "../../User/db";
import { PostingAccessTable } from "../db";

export async function acceptInvitation(
  ctx: AuthorizedContext,
  token: string,
): Promise<boolean> {
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

  if (!access) {
    throw GQLError(404, "Invitation not found or already accepted");
  }

  if (!access.pending) {
    throw GQLError(400, "Invitation has already been accepted");
  }

  const [user] = await db
    .update(UserTable)
    .set({
      emailVerified: true,
    })
    .where(and(eq(UserTable.id, ctx.userId), eq(UserTable.email, access.email)))
    .returning();

  if (!user) {
    throw GQLError(
      403,
      "Email mismatch - invitation was sent to a different email",
    );
  }

  // Update the access record to set the user and mark as accepted
  await db
    .update(PostingAccessTable)
    .set({
      user: ctx.userId,
      pending: false,
      updatedAt: new Date(),
    })
    .where(eq(PostingAccessTable.id, access.id));

  return true;
}
