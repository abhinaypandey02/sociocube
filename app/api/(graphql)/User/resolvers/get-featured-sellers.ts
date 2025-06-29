import { db } from "@backend/lib/db";
import {
  and,
  desc,
  eq,
  getTableColumns,
  inArray,
  isNotNull,
} from "drizzle-orm";

import { InstagramDetails } from "../../Instagram/db";
import { UserTable } from "../db";

export async function handleGetFeaturedSellers() {
  return db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .where(
      and(
        isNotNull(UserTable.photo),
        isNotNull(UserTable.bio),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        inArray(UserTable.username, [
          "enricasciarretta",
          "thecrazysk",
          "vidhya_vijaykumar",
          "ankitmishra1310",
          "amothertwosons",
          "sanikahehe",
          "shadia89",
          "marusaach22",
        ]),
      ),
    )
    .innerJoin(
      InstagramDetails,
      and(eq(InstagramDetails.id, UserTable.instagramDetails)),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(9);
}
