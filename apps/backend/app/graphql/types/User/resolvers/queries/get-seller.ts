import { and, eq, or } from "drizzle-orm";
import { ArgsType, Field } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";

@ArgsType()
export class GetSellerInput {
  @Field(() => String)
  username: string;
}

export async function handleGetSeller(input: GetSellerInput) {
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
