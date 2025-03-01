import { and, eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";
import { Field, ObjectType } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../../User/db/schema";
import { InviteTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import { AgencyTable } from "../../../Agency/db/schema";
import { getAgencyTypeNameFromInviteType } from "../../utils";

@ObjectType()
export class InviteDetails {
  @Field()
  title: string;
  @Field()
  subtitle: string;
  @Field()
  email: string;
}

export async function getInviteDetails(token: string) {
  const data = verify(token, process.env.SIGNING_KEY || "") as {
    id: number;
    agency: number;
  } | null;
  if (!data?.id || !data.agency)
    throw GQLError(400, "Invalid token, please request again");
  const [res] = await db
    .select()
    .from(InviteTable)
    .where(eq(InviteTable.id, data.id))
    .innerJoin(UserTable, eq(UserTable.id, InviteTable.by));
  const [agency] = await db
    .select()
    .from(AgencyTable)
    .where(and(eq(AgencyTable.id, data.agency)));
  if (!res) throw GQLError(400, "Request expired, please request again");

  return {
    title: `Become an ${getAgencyTypeNameFromInviteType(res.invite.type)} of ${agency?.name}`,
    subtitle: `You have been invited by ${res.user.name} to be the ${getAgencyTypeNameFromInviteType(res.invite.type)} of ${agency?.name}`,
    email: res.invite.email,
  };
}
