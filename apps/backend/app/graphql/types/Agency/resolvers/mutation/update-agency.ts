import {Field, InputType} from "type-graphql";
import {IsEmail, IsNumberString, IsUrl, Matches, MaxLength,} from "class-validator";
import {and, eq} from "drizzle-orm";
import {NAME_MAX_LENGTH, USERNAME_MAX_LENGTH} from "commons/constraints";
import {USERNAME_REGEX} from "commons/regex";
import {db} from "../../../../../../lib/db";
import {AgencyMember, AgencyTable} from "../../db/schema";
import {AuthorizedContext} from "../../../../context";
import GQLError from "../../../../constants/errors";
import {handleIsUsernameAvailable} from "../../../User/resolvers/queries/is-username-available";

@InputType("UpdateAgencyInput")
export class UpdateAgencyInput {
  @Field({ nullable: true })
  @MaxLength(NAME_MAX_LENGTH * 2)
  name?: string;
  @Field({ nullable: true })
  @IsEmail()
  contactEmail?: string;
  @Field({ nullable: true })
  @MaxLength(15)
  @IsNumberString()
  contactPhone?: string;
  @Field({ nullable: true })
  @IsUrl()
  photo?: string;
  @Field({ nullable: true })
  @Matches(USERNAME_REGEX)
  @MaxLength(USERNAME_MAX_LENGTH)
  username?: string;
}
export async function updateAgency(
  ctx: AuthorizedContext,
  id: number,
  updatedAgency: UpdateAgencyInput,
): Promise<boolean> {
  const [agency] = await db
    .select()
    .from(AgencyMember)
    .where(and(eq(AgencyMember.user, ctx.userId), eq(AgencyMember.agency, id)))
    .innerJoin(AgencyTable, eq(AgencyTable.id, AgencyMember.agency));
  if (!agency) throw GQLError(403, "You dont have access to this agency");
  if (
    updatedAgency.username &&
    !(await handleIsUsernameAvailable(updatedAgency.username))
  ) {
    throw GQLError(400, "Username taken");
  }
  await db
    .update(AgencyTable)
    .set(updatedAgency)
    .where(eq(AgencyTable.id, agency.agency.id));
  return true;
}
