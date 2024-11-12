import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { LocationTable, UserTable } from "../../db/schema";
import type { Context } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { getCurrentUser } from "../../utils";

@InputType("UpdateLocation")
export class UpdateLocationInput {
  @Field({ nullable: true })
  city?: number;
  @Field()
  country: number;
  @Field()
  state: number;
}

export async function handleUpdateLocation(
  ctx: Context,
  args: UpdateLocationInput,
) {
  if (!ctx.userId) throw GQLError(403);
  const user = await getCurrentUser(ctx);
  if (user?.location)
    await db
      .update(LocationTable)
      .set(args)
      .where(eq(LocationTable.id, user.location));
  else if (args.country && args.state) {
    const [res] = await db.insert(LocationTable).values(args).returning();
    if (res?.id)
      await db
        .update(UserTable)
        .set({
          location: res.id,
        })
        .where(eq(UserTable.id, ctx.userId));
  } else return false;

  return true;
}
