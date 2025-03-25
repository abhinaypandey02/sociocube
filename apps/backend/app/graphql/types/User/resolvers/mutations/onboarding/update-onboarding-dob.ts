import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { IsDateString } from "class-validator";
import { getAge, MAX_AGE, MIN_AGE } from "commons/age";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { UserTable } from "../../../db/schema";
import GQLError from "../../../../../constants/errors";

@InputType("OnboardingDOBInput")
export class OnboardingDOBInput {
  @Field()
  @IsDateString()
  dob: string;
}
export async function handleUpdateOnboardingDOB(
  ctx: AuthorizedContext,
  { dob }: OnboardingDOBInput,
) {
  const age = getAge(new Date(dob));
  if (age < MIN_AGE || age > MAX_AGE)
    throw GQLError(400, "Invalid date of birth");
  await db
    .update(UserTable)
    .set({
      dob,
    })
    .where(eq(UserTable.id, ctx.userId));
  return true;
}
