import { Field, InputType } from "type-graphql";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { AgencyMember, AgencyTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { LocationTable } from "../../../User/db/schema";
import GQLError from "../../../../constants/errors";

@InputType("UpdateAgencyLocationInput")
export class UpdateAgencyLocationInput {
  @Field({ nullable: true })
  city?: number;
  @Field()
  state: number;
  @Field()
  country: number;
}
export async function updateAgencyLocation(
  ctx: AuthorizedContext,
  id: number,
  updatedAgency: UpdateAgencyLocationInput,
): Promise<boolean> {
  const [agency] = await db
    .select()
    .from(AgencyMember)
    .where(and(eq(AgencyMember.user, ctx.userId), eq(AgencyMember.agency, id)))
    .innerJoin(AgencyTable, eq(AgencyTable.id, AgencyMember.agency));
  if (!agency) throw GQLError(403, "You dont have access to this agency");
  await db
    .update(LocationTable)
    .set({
      country: updatedAgency.country,
      city: updatedAgency.city,
      state: updatedAgency.state,
    })
    .where(eq(LocationTable.id, agency.agency.location));
  return true;
}
