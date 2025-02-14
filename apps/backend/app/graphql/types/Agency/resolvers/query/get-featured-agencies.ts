import { db } from "../../../../../../lib/db";
import { AgencyTable } from "../../db/schema";

export function getFeaturedAgencies() {
  return db.select().from(AgencyTable).limit(8);
}
