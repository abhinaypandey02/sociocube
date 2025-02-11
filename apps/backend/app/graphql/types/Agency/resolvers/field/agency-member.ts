import { FieldResolver, Resolver, Root } from "type-graphql";
import { eq } from "drizzle-orm";
import { AgencyGQL, AgencyMemberGQL } from "../../type";
import type { AgencyMemberDB } from "../../db/schema";
import { AgencyTable } from "../../db/schema";
import { db } from "../../../../../../lib/db";

@Resolver(() => AgencyMemberGQL)
export class AgencyMemberFieldResolver {
  @FieldResolver(() => AgencyGQL)
  async agencyDetails(
    @Root() agencyMember: AgencyMemberDB,
  ): Promise<AgencyGQL | null | undefined> {
    const [agency] = await db
      .select()
      .from(AgencyTable)
      .where(eq(AgencyTable.id, agencyMember.agency));
    return agency;
  }
}
