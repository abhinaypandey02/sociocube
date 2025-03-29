import type { AuthorizedContext } from "../../../../context";
import { getCurrentUser } from "../../utils";

export async function handleGetCurrentUser(ctx: AuthorizedContext) {
  return getCurrentUser(ctx);
}
