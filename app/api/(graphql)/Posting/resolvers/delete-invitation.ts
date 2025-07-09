import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { UserTable } from "@graphql/User/db";
import { and, eq } from "drizzle-orm";

import { PostingAccessTable, PostingTable } from "../db";

export async function deleteInvitation(
  ctx: AuthorizedContext,
  accessId: number,
): Promise<boolean> {
  // Get the access record
  const [access] = await db
    .select()
    .from(PostingAccessTable)
    .where(eq(PostingAccessTable.id, accessId))
    .innerJoin(PostingTable, eq(PostingTable.id, PostingAccessTable.posting))
    .innerJoin(
      UserTable,
      and(eq(PostingTable.agency, UserTable.id), eq(UserTable.id, ctx.userId)),
    );

  if (!access) {
    throw GQLError(404, "Access record not found");
  }

  // Delete the access record
  await db
    .delete(PostingAccessTable)
    .where(eq(PostingAccessTable.id, accessId));

  return true;
}
