import { eq } from "drizzle-orm";
import { db } from "../../../../../lib/db";
import { AddressDB, AddressDBInsert, AddressTable } from "./schema";

export async function handleCreateAddress(
  data: AddressDBInsert,
): Promise<AddressDB | undefined> {
  const [address] = await db.insert(AddressTable).values(data).returning();
  return address;
}

export async function handleGetAddress(
  id: number,
): Promise<AddressDB | undefined> {
  const [address] = await db
    .select()
    .from(AddressTable)
    .where(eq(AddressTable.id, id));
  return address;
}

export async function handleUpdateAddress(
  addressID: number,
  data: Partial<AddressDBInsert>,
) {
  return db
    .update(AddressTable)
    .set(data)
    .where(eq(AddressTable.id, addressID));
}
