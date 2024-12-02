import { eq } from "drizzle-orm";
import { ArgsType, Field } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../db/schema";
import { usernameAllowed } from "../../utils";

@ArgsType()
export class IsUsernameAvailableArgs {
  @Field()
  username: string;
}

export async function handleIsUsernameAvailable(
  input: IsUsernameAvailableArgs,
) {
  if (!usernameAllowed(input.username)) throw new Error("Username invalid");
  const [seller] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, input.username))
    .limit(1);
  if (seller) return false;
  const [onboardingSeller] = await db
    .select()
    .from(OnboardingDataTable)
    .where(eq(OnboardingDataTable.username, input.username))
    .limit(1);
  return !onboardingSeller;
}
