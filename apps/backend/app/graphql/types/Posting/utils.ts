import { PostgresError } from "postgres";
import GQLError from "../../constants/errors";
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
