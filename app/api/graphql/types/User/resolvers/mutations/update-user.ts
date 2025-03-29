import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNumberString,
  IsUrl,
  Matches,
  MaxLength,
} from "class-validator";
import categories from "@/constants/categories";
import genders from "@/constants/genders";
import { getAge, MAX_AGE, MIN_AGE } from "@/constants/age";
import { USERNAME_REGEX } from "@/constants/regex";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from "@/constants/constraints";
import { db } from "@backend/lib/db";
import { PricingTable, UserTable } from "../../db/schema";
import type { AuthorizedContext } from "@graphql/context";
import { Pricing } from "../../type";
import GQLError from "../../../../constants/errors";
import { Roles } from "@graphql/constants/roles";

@InputType("UpdateUserInput")
export class UpdateUserInput {
  @MaxLength(NAME_MAX_LENGTH)
  @Field({ nullable: true })
  name?: string;
  @IsEmail()
  @Field({ nullable: true })
  contactEmail?: string;
  @MaxLength(15)
  @IsNumberString()
  @Field({ nullable: true })
  phone?: string;
  @MaxLength(BIO_MAX_LENGTH)
  @Field({ nullable: true })
  bio?: string;
  @Field({ nullable: true })
  @IsUrl()
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
  @IsEnum(Roles)
  role?: Roles;
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
  await db
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
      phone: updatedUser.phone,
      role: updatedUser.role,
    })
    .where(eq(UserTable.id, ctx.userId))
    .returning();
  if (updatedUser.pricing) {
    await db
      .insert(PricingTable)
      .values({
        ...updatedUser.pricing,
        user: ctx.userId,
      })
      .onConflictDoUpdate({
        target: PricingTable.user,
        set: updatedUser.pricing,
      });
  }
  return true;
}
