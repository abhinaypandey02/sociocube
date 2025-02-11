import { Field, InputType } from "type-graphql";
import { eq } from "drizzle-orm";
import { Matches, MaxLength } from "class-validator";
import { USERNAME_REGEX } from "commons/regex";
import { USERNAME_MAX_LENGTH } from "commons/constraints";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { OnboardingDataTable } from "../../../db/schema";
import { getCurrentUser, usernameAllowed } from "../../../utils";
import GQLError from "../../../../../constants/errors";
import { handleIsUsernameAvailable } from "../../queries/is-username-available";

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
  if (!usernameAllowed(username)) throw GQLError(400, "Invalid username!");
  if (!(await handleIsUsernameAvailable(username)))
    throw GQLError(400, "Username taken");
  await db
    .update(OnboardingDataTable)
    .set({
      username,
    })
    .where(eq(OnboardingDataTable.id, user.onboardingData));
  return true;
}
