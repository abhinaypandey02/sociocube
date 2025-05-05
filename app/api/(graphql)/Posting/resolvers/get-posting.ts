import { Context } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { handleEligibility } from "@graphql/Posting/resolvers/get-all-postings";
import { eq } from "drizzle-orm";

import { PostingTable } from "../db";

export async function getPosting(ctx: Context, id: number) {
  const { eligibility } = await handleEligibility(ctx);

  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, id));
  if (!posting) return null;
  return { ...posting, eligibility: eligibility(posting) };
}
