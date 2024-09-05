import { eq } from "drizzle-orm";
import { Context } from "../../context";
import GQLError from "../../constants/errors";
import { UserTable } from "./db/schema";
import { getUser } from "./db/utils";

export const getCurrentUser = (ctx: Context) => {
  if (!ctx.userId)
    throw GQLError(404, "You need to be logged in to perform this action");
  return getUser(eq(UserTable.id, ctx.userId));
};
