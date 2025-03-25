import {Field, InputType} from "type-graphql";
import {eq} from "drizzle-orm";
import {Matches, MaxLength} from "class-validator";
import {USERNAME_REGEX} from "commons/regex";
import {USERNAME_MAX_LENGTH} from "commons/constraints";
import {AuthorizedContext} from "../../../../../context";
import {db} from "../../../../../../../lib/db";
import {usernameAllowed} from "../../../utils";
import GQLError from "../../../../../constants/errors";
import {UserTable} from "../../../db/schema";

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
  if (!usernameAllowed(username)) throw GQLError(400, "Invalid username!");
  await db
    .update(UserTable)
    .set({
      username,
    })
    .where(eq(UserTable.id, ctx.userId));
  return true;
}
