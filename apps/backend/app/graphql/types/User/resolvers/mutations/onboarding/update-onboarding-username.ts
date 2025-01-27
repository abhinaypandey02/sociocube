import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { Matches, MaxLength } from "class-validator";
import { USERNAME_REGEX } from "commons/regex";
import { USERNAME_MAX_LENGTH } from "commons/constraints";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable, UserTable } from "../../../db/schema";
import { getCurrentUser, usernameAllowed } from "../../../utils";
import GQLError from "../../../../../constants/errors";

@InputType("OnboardingUsernameInput")
export class OnboardingUsernameInput {
  @Field()
  @Matches(USERNAME_REGEX)
  @MaxLength(USERNAME_MAX_LENGTH)
  username: string;
}
export async function handleUpdateOnboardingUsername(
  ctx: AuthorizedContext,
  { username: usernameRaw }: OnboardingUsernameInput,
) {
  const username = usernameRaw.toLowerCase();
  const user = await getCurrentUser(ctx);
  if (!user) throw GQLError(403);
  if (!user.onboardingData) throw GQLError(400, "Onboarding details missing");
  const existingUsers = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, username));
  if (!usernameAllowed(username)) throw GQLError(400, "Invalid username!");
  if (existingUsers.length > 0) throw GQLError(400, "Username taken");
  await db
    .update(OnboardingDataTable)
    .set({
      username,
    })
    .where(eq(OnboardingDataTable.id, user.onboardingData));
  return true;
}
