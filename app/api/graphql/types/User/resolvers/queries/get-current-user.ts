import type { AuthorizedContext } from "@graphql/context";

import { getCurrentUser } from "../../utils";

export async function handleGetCurrentUser(ctx: AuthorizedContext) {
  return getCurrentUser(ctx);
}
