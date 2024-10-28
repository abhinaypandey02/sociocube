import { eq } from "drizzle-orm";
import { Context } from "../../context";
import { UserTable } from "./db/schema";
import { getUser } from "./db/utils";

export const getCurrentUser = (ctx: Context) => {
  if (!ctx.userId) return null;
  return getUser(eq(UserTable.id, ctx.userId));
};
