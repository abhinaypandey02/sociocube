import { PostgresError } from "postgres";
import { and, eq } from "drizzle-orm";
import GQLError from "../../constants/errors";
import { AuthorizedContext } from "../../context";
import { db } from "../../../../lib/db";
import { AgencyMember } from "../Agency/db/schema";
import { PostingTable } from "./db/schema";

export function getCleanExternalLink(externalLink: string | null) {
  if (!externalLink) return null;
  const link = externalLink.trim();
  if (!link.startsWith("http")) {
    throw GQLError(400, "Invalid link: All links should start with http");
  }
  if (link.endsWith("/")) return externalLink.slice(0, externalLink.length - 1);
  return link;
}

export function handleDuplicateLinkError(e: PostgresError) {
  if (e.constraint_name === PostingTable.externalLink.uniqueName) {
    throw GQLError(400, "This form link has already been submitted");
  }
}

export async function checkPermission(
  ctx: AuthorizedContext,
  postingID: number,
) {
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, postingID))
    .innerJoin(
      AgencyMember,
      and(
        eq(AgencyMember.agency, PostingTable.agency),
        eq(AgencyMember.user, ctx.userId),
      ),
    );
  if (!posting) throw GQLError(400, "You dont have permission for this agency");
}
