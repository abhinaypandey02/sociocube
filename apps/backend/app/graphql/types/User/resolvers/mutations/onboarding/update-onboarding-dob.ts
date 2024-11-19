import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { IsDateString } from "class-validator";
import { getAge, MAX_AGE, MIN_AGE } from "commons/age";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable } from "../../../db/schema";
import { getCurrentUser } from "../../../utils";
import GQLError from "../../../../../constants/errors";

@InputType("UpdateDateOfBirthArgs")
export class UpdateDateOfBirthArgs {
  @Field()
  @IsDateString()
  dob: string;
}
export async function handleUpdateOnboardingDOB(
  args: UpdateDateOfBirthArgs,
  ctx: Context,
) {
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403);
  if (!user.onboardingData) throw GQLError(400, "Onboarding details missing");
  const age = getAge(new Date(args.dob));
  if (age < MIN_AGE || age > MAX_AGE)
    throw GQLError(400, "Invalid date of birth");
  await db
    .update(OnboardingDataTable)
    .set({
      dob: args.dob,
    })
    .where(eq(OnboardingDataTable.id, user.onboardingData));
  return true;
}
