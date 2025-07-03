import { db } from "@backend/lib/db";
import { count, eq, inArray } from "drizzle-orm";

import { ApplicationTable } from "../../Application/db";
import { PostingTable } from "../../Posting/db";

export async function getTotalApplications(userId: number): Promise<number> {
  const [applications] = await db
    .select({ count: count() })
    .from(ApplicationTable)
    .where(
      inArray(
        ApplicationTable.posting,
        db
          .select({ id: PostingTable.id })
          .from(PostingTable)
          .where(eq(PostingTable.agency, userId)),
      ),
    );
  return applications?.count || 0;
}
