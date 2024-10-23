import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { IsIn, IsDateString } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../../db/schema";
import { getCurrentUser } from "../../../utils";

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
  return db.transaction(async (tx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return false;
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
      return false;
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
