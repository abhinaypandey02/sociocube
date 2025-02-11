import { Field, InputType } from "type-graphql";
import { IsEmail, IsNumberString, IsUrl, MaxLength } from "class-validator";
import { BIO_MAX_LENGTH, NAME_MAX_LENGTH } from "commons/constraints";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { AgencyOnboardingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";

@InputType("AgencyBasicDetailsInput")
export class AgencyBasicDetailsInput {
  @Field()
  @MaxLength(NAME_MAX_LENGTH * 2)
  name: string;
  @MaxLength(BIO_MAX_LENGTH)
  @Field({ nullable: true })
  bio?: string;
  @Field()
  @IsEmail()
  contactEmail: string;
  @Field()
  @MaxLength(15)
  @IsNumberString()
  contactPhone: string;
  @Field()
  @IsUrl()
  photo: string;
}

export async function addAgencyBasicDetails(
  ctx: AuthorizedContext,
  newAgency: AgencyBasicDetailsInput,
): Promise<boolean> {
  const [onboardingDetails] = await db
    .select()
    .from(AgencyOnboardingTable)
    .where(and(eq(AgencyOnboardingTable.user, ctx.userId)));
  if (!onboardingDetails)
    throw GQLError(400, "Please complete previous steps first");
  await db
    .update(AgencyOnboardingTable)
    .set({
      ...onboardingDetails,
      ...newAgency,
    })
    .where(eq(AgencyOnboardingTable.id, onboardingDetails.id));
  return true;
}
