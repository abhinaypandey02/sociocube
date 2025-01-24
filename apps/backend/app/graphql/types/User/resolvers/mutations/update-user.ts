import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import {
  IsDateString,
  IsEmail,
  IsIn,
  Matches,
  MaxLength,
} from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { getAge, MAX_AGE, MIN_AGE } from "commons/age";
import { USERNAME_REGEX } from "commons/regex";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from "commons/constraints";
import { db } from "../../../../../../lib/db";
import { PricingTable, UserTable } from "../../db/schema";
import type { AuthorizedContext } from "../../../../context";
import { Pricing } from "../../type";
import GQLError from "../../../../constants/errors";
import { isUserNameAvailable } from "../../utils";

@InputType("UpdateUserInput")
export class UpdateUserInput {
  @MaxLength(NAME_MAX_LENGTH)
  @Field({ nullable: true })
  name?: string;
  @IsEmail()
  @Field({ nullable: true })
  contactEmail?: string;
  @MaxLength(BIO_MAX_LENGTH)
  @Field({ nullable: true })
  bio?: string;
  @Field({ nullable: true })
  photo?: string;
  @Field({ nullable: true })
  @IsIn(categories.map(({ title }) => title))
  category?: string;
  @Field({ nullable: true })
  @IsIn(genders)
  gender?: string;
  @Field({ nullable: true })
  pricing?: Pricing;
  @Field({ nullable: true })
  @Matches(USERNAME_REGEX)
  @MaxLength(USERNAME_MAX_LENGTH)
  username?: string;
  @Field({ nullable: true })
  @IsDateString()
  dob?: string;
}

export async function handleUpdateUser(
  ctx: AuthorizedContext,
  updatedUser: UpdateUserInput,
) {
  if (updatedUser.dob) {
    const age = getAge(new Date(updatedUser.dob));
    if (age < MIN_AGE || age > MAX_AGE)
      throw GQLError(400, "Invalid date of birth");
  }
  if (updatedUser.username) {
    if (!(await isUserNameAvailable(updatedUser.username)))
      throw GQLError(400, "Invalid username");
  }
  const [user] = await db
    .update(UserTable)
    .set({
      id: ctx.userId,
      name: updatedUser.name,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
      category: updatedUser.category,
      gender: updatedUser.gender,
      dob: updatedUser.dob,
      username: updatedUser.username,
      contactEmail: updatedUser.contactEmail,
    })
    .where(eq(UserTable.id, ctx.userId))
    .returning();
  if (updatedUser.pricing) {
    if (user?.pricing) {
      await db
        .update(PricingTable)
        .set(updatedUser.pricing)
        .where(eq(PricingTable.id, user.pricing));
    } else {
      const [pricing] = await db
        .insert(PricingTable)
        .values(updatedUser.pricing)
        .returning({ id: PricingTable.id });
      if (pricing?.id) {
        await db
          .update(UserTable)
          .set({ pricing: pricing.id })
          .where(eq(UserTable.id, ctx.userId));
      }
    }
  }
  return true;
}
