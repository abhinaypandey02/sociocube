import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import type { Context } from "../../../../context";

@InputType("UpdateUserArgs")
export class UpdateUserArgs {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  bio?: string;
  @Field({ nullable: true })
  photo?: string;
}

export async function handleUpdateUser(ctx: Context, args: UpdateUserArgs) {
  if (!ctx.userId) return false;
  await db.update(UserTable).set(args).where(eq(UserTable.id, ctx.userId));
  return true;
}
