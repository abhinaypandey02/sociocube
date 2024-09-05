import { eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { Context } from "../../../../context";
import { OrganizationDB, OrganizationTable } from "../../db/schema";

export async function handleGetOrganization(
  ctx: Context,
): Promise<OrganizationDB | null> {
  if (!ctx.userId) return null;
  const [res] = await db
    .select()
    .from(OrganizationTable)
    .where(eq(OrganizationTable.admin, ctx.userId));
  return res || null;
}
