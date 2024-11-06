import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { IsIn, IsDateString } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { getAge, MAX_AGE, MIN_AGE } from "commons/age";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../../db/schema";
import { getCurrentUser } from "../../../utils";
import GQLError from "../../../../../constants/errors";

@InputType("UpdateBasicDetailsArgs")
export class UpdateBasicDetailsArgs {
  @Field()
  name: string;
  @Field()
  bio: string;
  @Field()
  @IsIn(categories.map(({ title }) => title))
  category: string;
  @Field()
  @IsIn(genders)
  gender: string;
  @Field()
  @IsDateString()
  dob: string;
  @Field({ nullable: true })
  imageURL: string;
}
export async function handleUpdateOnboardingBasicDetails(
  args: UpdateBasicDetailsArgs,
  ctx: Context,
) {
  const age = getAge(new Date(args.dob));
  if (age < MIN_AGE || age > MAX_AGE)
    throw GQLError(400, "Invalid date of birth");
  return db.transaction(async (tx) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw GQLError(403, "User not logged in");
    if (user.onboardingData) {
      await tx
        .update(OnboardingDataTable)
        .set({
          name: args.name,
          photo: args.imageURL,
          bio: args.bio,
          gender: args.gender,
          category: args.category,
          dob: args.dob,
        })
        .where(eq(OnboardingDataTable.id, user.onboardingData));
      return true;
    }
    const [data] = await tx
      .insert(OnboardingDataTable)
      .values({
        name: args.name,
        photo: args.imageURL,
        bio: args.bio,
        gender: args.gender,
        category: args.category,
        dob: args.dob,
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
