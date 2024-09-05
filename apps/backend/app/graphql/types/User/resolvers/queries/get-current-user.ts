import { Context } from "../../../../context";
import { getCurrentUser } from "../../utils";

export async function handleGetCurrentUser(ctx: Context) {
  return getCurrentUser(ctx);
}
