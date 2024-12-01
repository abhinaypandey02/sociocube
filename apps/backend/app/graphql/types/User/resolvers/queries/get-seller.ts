import { and, eq, or } from "drizzle-orm";
import { ArgsType, Field, Int } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";

@ArgsType()
export class GetSellerInput {
  @Field(() => Int, { nullable: true })
  id?: number;
  @Field(() => String, { nullable: true })
  username?: string;
}

export async function handleGetSeller(input: GetSellerInput) {
  if (input.id) {
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
  if (input.username) {
    const [seller] = await db
      .select()
      .from(UserTable)
      .where(
        and(
          or(eq(UserTable.isOnboarded, true), eq(UserTable.isSpirit, true)),
          eq(UserTable.username, input.username),
        ),
      )
      .limit(1);
    return seller;
  }
  return null;
}
