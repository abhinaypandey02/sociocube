import { and, eq, or } from "drizzle-orm";
import { ArgsType, Field, Int } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";

@ArgsType()
export class GetSellerInput {
  @Field(() => Int)
  id: number;
}

export async function handleGetSeller(input: GetSellerInput) {
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(
      and(
        or(eq(UserTable.isOnboarded, true), eq(UserTable.isSpirit, true)),
        eq(UserTable.id, input.id),
      ),
    )
    .limit(1);
  return seller;
}
