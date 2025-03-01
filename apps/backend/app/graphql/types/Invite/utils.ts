import { and, eq } from "drizzle-orm";
import { db } from "../../../../lib/db";
import { AgencyMember } from "../Agency/db/schema";
import { AgencyMemberType } from "../../constants/agency-member-type";
import GQLError from "../../constants/errors";
import { InviteType } from "./db/schema";

export async function transferOwnership(newOwner: number, agency: number) {
  const [existingOwner] = await db
    .select()
    .from(AgencyMember)
    .where(
      and(
        eq(AgencyMember.user, newOwner),
        eq(AgencyMember.type, AgencyMemberType.Owner),
      ),
    );
  if (existingOwner) throw GQLError(400, "Already an owner of an agency.");
  await db
    .update(AgencyMember)
    .set({
      type: AgencyMemberType.Admin,
    })
    .where(
      and(
        eq(AgencyMember.agency, agency),
        eq(AgencyMember.type, AgencyMemberType.Owner),
      ),
    );
  await db.insert(AgencyMember).values({
    user: newOwner,
    type: AgencyMemberType.Owner,
    agency,
  });
}

export function getAgencyTypeNameFromInviteType(type: InviteType) {
  switch (type) {
    case InviteType.AgencyOwner:
      return "Owner";
    default:
      return "Admin";
  }
}
