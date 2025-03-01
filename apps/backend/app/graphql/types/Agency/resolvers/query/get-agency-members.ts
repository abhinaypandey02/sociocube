import { and, eq } from "drizzle-orm";
import { Field, ObjectType } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { AgencyMember } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { UserTable } from "../../../User/db/schema";
import GQLError from "../../../../constants/errors";
import { AgencyMemberType } from "../../../../constants/agency-member-type";

@ObjectType("GetAgencyMember")
export class GetAgencyMember {
  @Field()
  email: string;
  @Field(() => AgencyMemberType)
  type: AgencyMemberType;
  @Field()
  name: string;
  @Field({ nullable: true })
  photo: string;
}

export async function getAgencyMembers(ctx: AuthorizedContext, id: number) {
  const members = await db
    .select({
      id: UserTable.id,
      email: UserTable.email,
      type: AgencyMember.type,
      name: UserTable.name,
      photo: UserTable.photo,
    })
    .from(AgencyMember)
    .where(and(eq(AgencyMember.agency, id)))
    .innerJoin(UserTable, and(eq(UserTable.id, AgencyMember.user)));
  if (!members.some((member) => member.id === ctx.userId))
    throw GQLError(403, "You dont have access to this agency");
  return members;
}
