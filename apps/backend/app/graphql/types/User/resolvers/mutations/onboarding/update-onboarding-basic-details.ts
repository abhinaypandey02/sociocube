import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { IsIn, IsDateString, MaxLength } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { getAge, MAX_AGE, MIN_AGE } from "commons/age";
import { BIO_MAX_LENGTH, NAME_MAX_LENGTH } from "commons/constraints";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../../db/schema";
import { getCurrentUser } from "../../../utils";
import GQLError from "../../../../../constants/errors";

@InputType("OnboardingBasicDetailsInput")
export class OnboardingBasicDetailsInput {
  @MaxLength(NAME_MAX_LENGTH)
  @Field()
  name: string;
  @MaxLength(BIO_MAX_LENGTH)
  @Field()
  bio: string;
  @Field()
  @IsIn(categories.map(({ title }) => title))
  category: string;
  @Field()
  @IsIn(genders)
  gender: string;
  @Field({ nullable: true })
  @IsDateString()
  dob?: string;
  @Field({ nullable: true })
  imageURL: string;
}
export async function handleUpdateOnboardingBasicDetails(
  ctx: AuthorizedContext,
  basicDetails: OnboardingBasicDetailsInput,
) {
  if (basicDetails.dob) {
    const age = getAge(new Date(basicDetails.dob));
    if (age < MIN_AGE || age > MAX_AGE)
      throw GQLError(400, "Invalid date of birth");
  }
  return db.transaction(async (tx) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw GQLError(403, "User not logged in");
    if (user.onboardingData) {
      await tx
        .update(OnboardingDataTable)
        .set({
          name: basicDetails.name,
          photo: basicDetails.imageURL,
          bio: basicDetails.bio,
          gender: basicDetails.gender,
          category: basicDetails.category,
          dob: basicDetails.dob,
        })
        .where(eq(OnboardingDataTable.id, user.onboardingData));
      return true;
    }
    const [data] = await tx
      .insert(OnboardingDataTable)
      .values({
        name: basicDetails.name,
        photo: basicDetails.imageURL,
        bio: basicDetails.bio,
        gender: basicDetails.gender,
        category: basicDetails.category,
        dob: basicDetails.dob,
      })
      .returning({ id: OnboardingDataTable.id });
    if (!data?.id) {
      tx.rollback();
      throw GQLError(500, "Failed to write to DB");
    }
    await tx
      .update(UserTable)
      .set({
        onboardingData: data.id,
      })
      .where(eq(UserTable.id, user.id));
    return true;
  });
}
