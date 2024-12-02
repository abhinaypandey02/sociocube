import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { Matches } from "class-validator";
import { USERNAME_REGEX } from "commons/regex";
import { Context } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../../db/schema";
import { getCurrentUser, usernameAllowed } from "../../../utils";
import GQLError from "../../../../../constants/errors";

@InputType("UpdateOnboardingUsernameArgs")
export class UpdateOnboardingUsernameArgs {
  @Field()
  @Matches(USERNAME_REGEX)
  username: string;
}
export async function handleUpdateOnboardingUsername(
  args: UpdateOnboardingUsernameArgs,
  ctx: Context,
) {
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403);
  if (!user.onboardingData) throw GQLError(400, "Onboarding details missing");
  const existingUsers = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, args.username));
  if (!usernameAllowed(args.username)) throw GQLError(400, "Invalid username!");
  if (existingUsers.length > 0) throw GQLError(400, "Username taken");
  await db
    .update(OnboardingDataTable)
    .set({
      username: args.username,
    })
    .where(eq(OnboardingDataTable.id, user.onboardingData));
  return true;
}
