import { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { ApplicationTable } from "@graphql/Application/db";
import { handleEligibility } from "@graphql/Posting/resolvers/get-all-postings";
import { and, eq, getTableColumns } from "drizzle-orm";

import { PostingTable } from "../db";

export async function getPosting(ctx: Context, id: number) {
  const { eligibility } = await handleEligibility(ctx);

  const query = db
    .select({
      ...getTableColumns(PostingTable),
      hasApplied: ctx.userId ? ApplicationTable.id : PostingTable.id,
    })
    .from(PostingTable)
    .where(eq(PostingTable.id, id));
  if (ctx.userId) {
    query.leftJoin(
      ApplicationTable,
      and(
        eq(ApplicationTable.posting, id),
        eq(ApplicationTable.user, ctx.userId),
      ),
    );
  }
  const [posting] = await query;
  if (!posting) return null;
  return {
    ...posting,
    eligibility: eligibility(posting),
    hasApplied: ctx.userId ? !!posting.hasApplied : false,
  };
}
