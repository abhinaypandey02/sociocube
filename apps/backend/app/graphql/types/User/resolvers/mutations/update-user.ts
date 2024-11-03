import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsDateString, IsIn } from "class-validator";
import categories from "commons/categories";
import genders from "commons/genders";
import { db } from "../../../../../../lib/db";
import { PricingTable, UserTable } from "../../db/schema";
import type { Context } from "../../../../context";
import { Pricing } from "../../type";

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
  city?: number;
  @Field({ nullable: true })
  pricing?: Pricing;
  @Field({ nullable: true })
  @IsDateString()
  dob?: string;
}

export async function handleUpdateUser(ctx: Context, args: UpdateUserArgs) {
  if (!ctx.userId) return false;
  const [user] = await db
    .update(UserTable)
    .set({
      id: ctx.userId,
      name: args.name,
      bio: args.bio,
      photo: args.photo,
      category: args.category,
      gender: args.gender,
      city: args.city,
      dob: args.dob,
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
