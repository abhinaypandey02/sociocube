import { countDistinct, desc, eq, inArray } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { AgencyTable } from "../../db/schema";
import { PostingTable } from "../../../Posting/db/schema";
import { ApplicationTable } from "../../../Application/db/schema";

export async function getFeaturedAgencies() {
  const data = await db
    .select({
      id: AgencyTable.id,
    })
    .from(AgencyTable)
    .leftJoin(PostingTable, eq(PostingTable.agency, AgencyTable.id))
    .leftJoin(ApplicationTable, eq(PostingTable.id, ApplicationTable.posting))
    .groupBy(AgencyTable.id)
    .orderBy(desc(countDistinct(ApplicationTable.id)))
    .limit(8);
  const dataIndexes = data.map(({ id }) => id);
  const finalData = await db
    .select()
    .from(AgencyTable)
    .where(
      inArray(
        AgencyTable.id,
        data.map(({ id }) => id),
      ),
    );
  return finalData.sort(
    (a, b) => dataIndexes.indexOf(a.id) - dataIndexes.indexOf(b.id),
  );
}
