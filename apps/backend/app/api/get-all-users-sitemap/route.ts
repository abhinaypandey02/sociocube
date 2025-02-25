import { isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { UserTable } from "../../graphql/types/User/db/schema";
import { AgencyTable } from "../../graphql/types/Agency/db/schema";

export const GET = async () => {
  const users = await db
    .select({ id: UserTable.username })
    .from(UserTable)
    .where(isNotNull(UserTable.instagramDetails));
  const agencies = await db
    .select({ id: AgencyTable.username })
    .from(AgencyTable)
    .where(isNotNull(AgencyTable.instagramDetails));
  return new NextResponse(
    JSON.stringify([
      ...agencies.map(({ id }) => id),
      ...users.map(({ id }) => id),
    ]),
  );
};
