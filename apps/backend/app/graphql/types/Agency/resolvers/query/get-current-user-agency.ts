import { and, eq } from "drizzle-orm";
import { Field, ObjectType } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { AgencyMember, AgencyTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { AgencyGQL } from "../../type";
import { AgencyMemberType } from "../../../../constants/agency-member-type";

@ObjectType("GetCurrentUserAgencyResponse")
export class GetCurrentUserAgencyResponse {
  @Field(() => AgencyGQL)
  agency: AgencyGQL;
  @Field(() => AgencyMemberType)
  type: AgencyMemberType;
}

export async function getCurrentUserAgency(
  ctx: AuthorizedContext,
  username?: string,
) {
  const [res] = await db
    .select()
    .from(AgencyMember)
    .where(and(eq(AgencyMember.user, ctx.userId)))
    .innerJoin(
      AgencyTable,
      and(
        eq(AgencyTable.id, AgencyMember.agency),
        username ? eq(AgencyTable.username, username) : undefined,
      ),
    )
    .limit(1);
  if (!res) return null;
  return { agency: res.agency, type: res.agency_member.type };
}
