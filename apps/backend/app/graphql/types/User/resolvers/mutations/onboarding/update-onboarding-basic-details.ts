import {Field, InputType} from "type-graphql";
import {eq} from "drizzle-orm";
import {IsDateString, IsIn, MaxLength} from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import {getAge, MAX_AGE, MIN_AGE} from "commons/age";
import {BIO_MAX_LENGTH, NAME_MAX_LENGTH} from "commons/constraints";
import {AuthorizedContext} from "../../../../../context";
import {db} from "../../../../../../../lib/db";
import {UserTable} from "../../../db/schema";
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
  await db
    .update(UserTable)
    .set({
      name: basicDetails.name,
      photo: basicDetails.imageURL,
      bio: basicDetails.bio,
      gender: basicDetails.gender,
      category: basicDetails.category,
      dob: basicDetails.dob,
    })
    .where(eq(UserTable.id, ctx.userId));
}
