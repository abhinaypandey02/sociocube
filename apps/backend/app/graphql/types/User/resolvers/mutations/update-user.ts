import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsDateString, IsIn, Matches } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { getAge, MAX_AGE, MIN_AGE } from "commons/age";
import { USERNAME_REGEX } from "commons/regex";
import { db } from "../../../../../../lib/db";
import { PricingTable, UserTable } from "../../db/schema";
import type { Context } from "../../../../context";
import { Pricing } from "../../type";
import GQLError from "../../../../constants/errors";
import { isUserNameAvailable } from "../../utils";

@InputType("UpdateUserArgs")
export class UpdateUserArgs {
  @Field({ nullable: true })
  name?: string;
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
  username?: string;
  @Field({ nullable: true })
  @IsDateString()
  dob?: string;
}

export async function handleUpdateUser(ctx: Context, args: UpdateUserArgs) {
  if (!ctx.userId) throw GQLError(403);
  if (args.dob) {
    const age = getAge(new Date(args.dob));
    if (age < MIN_AGE || age > MAX_AGE)
      throw GQLError(400, "Invalid date of birth");
  }
  if (args.username) {
    if (!(await isUserNameAvailable(args.username)))
      throw GQLError(400, "Invalid username");
  }
  const [user] = await db
    .update(UserTable)
    .set({
      id: ctx.userId,
      name: args.name,
      bio: args.bio,
      photo: args.photo,
      category: args.category,
      gender: args.gender,
      dob: args.dob,
      username: args.username,
    })
    .where(eq(UserTable.id, ctx.userId))
    .returning();
  if (args.pricing) {
    if (user?.pricing) {
      await db
        .update(PricingTable)
        .set(args.pricing)
        .where(eq(PricingTable.id, user.pricing));
    } else {
      const [pricing] = await db
        .insert(PricingTable)
        .values(args.pricing)
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
