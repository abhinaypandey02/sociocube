import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { Field, InputType } from "type-graphql";

import { LocationTable, UserTable } from "../db";
import { getCurrentUser } from "../utils";

@InputType("UpdateLocation")
export class UpdateLocationInput {
  @Field({ nullable: true })
  city?: number;
  @Field()
  country: number;
}

export async function handleUpdateLocation(
  ctx: AuthorizedContext,
  updatedLocation: UpdateLocationInput,
) {
  const user = await getCurrentUser(ctx);
  if (user?.location)
    await db
      .update(LocationTable)
      .set(updatedLocation)
      .where(eq(LocationTable.id, user.location));
  else if (updatedLocation.country && updatedLocation.city) {
    const [res] = await db
      .insert(LocationTable)
      .values(updatedLocation)
      .returning();
    if (res?.id)
      await db
        .update(UserTable)
        .set({
          location: res.id,
        })
        .where(eq(UserTable.id, ctx.userId));
  }
  if (user?.username) {
    revalidateTag(`profile-${user.username}`);
  }
  return true;
}
