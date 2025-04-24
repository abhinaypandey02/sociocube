import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { Roles } from "@backend/lib/constants/roles";
import { db } from "@backend/lib/db";
import { usernameAllowed } from "@graphql/User/utils";
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNumberString,
  IsUrl,
  Matches,
  MaxLength,
} from "class-validator";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { Field, InputType } from "type-graphql";

import { getAge, MAX_AGE, MIN_AGE } from "@/constants/age";
import categories from "@/constants/categories";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from "@/constants/constraints";
import genders from "@/constants/genders";
import { USERNAME_REGEX } from "@/constants/regex";

import { PricingTable, UserTable } from "../db";
import { Pricing } from "../type";

@InputType("UpdateUserInput")
export class UpdateUserInput {
  @MaxLength(NAME_MAX_LENGTH)
  @Field({ nullable: true })
  name?: string;
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
  if (updatedUser.username && !usernameAllowed(updatedUser.username)) {
    throw GQLError(400, "Invalid username");
  }
  if (updatedUser.dob) {
    const age = getAge(new Date(updatedUser.dob));
    if (age < MIN_AGE || age > MAX_AGE)
      throw GQLError(400, "Invalid date of birth");
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
      phone: updatedUser.phone,
      role: updatedUser.role,
    })
    .where(eq(UserTable.id, ctx.userId))
    .returning({ username: UserTable.username });
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
  if (user?.username) {
    revalidateTag(`profile-${user.username}`);
  }
  return true;
}
