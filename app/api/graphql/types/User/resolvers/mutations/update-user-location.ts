import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { db } from "@backend/lib/db";
import { LocationTable, UserTable } from "../../db/schema";
import type { AuthorizedContext } from "@graphql/context";
import { getCurrentUser } from "../../utils";
import { CountryTable } from "../../../Map/db/schema";

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
  ctx: AuthorizedContext,
  updatedLocation: UpdateLocationInput,
) {
  const user = await getCurrentUser(ctx);

  if (user?.location)
    await db
      .update(LocationTable)
      .set(updatedLocation)
      .where(eq(LocationTable.id, user.location));
  else if (updatedLocation.country && updatedLocation.state) {
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
  const [country] = await db
    .select()
    .from(CountryTable)
    .where(eq(CountryTable.id, updatedLocation.country));
  return {
    name: country?.currencyName || undefined,
    symbol: country?.currencySymbol || undefined,
  };
}
