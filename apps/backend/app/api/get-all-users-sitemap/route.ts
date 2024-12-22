import { isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { UserTable } from "../../graphql/types/User/db/schema";

export const GET = async () => {
  const users = await db
    .select({ id: UserTable.id })
    .from(UserTable)
    .where(isNotNull(UserTable.instagramDetails));
  return new NextResponse(JSON.stringify(users.map((user) => user.id)));
};
