import { Authorized, FieldResolver, Resolver, Root } from "type-graphql";
import { eq } from "drizzle-orm";
import { UserGQL } from "../../../User/type";
import { OrganizationGQL } from "../../types";
import { db } from "../../../../../../lib/db";
import { UserDB, UserTable } from "../../../User/db/schema";
import type { OrganizationDB } from "../../db/schema";
import { AddressGQL } from "../../../Address/types";
import { AddressDB, AddressTable } from "../../../Address/db/schema";

@Resolver(() => OrganizationGQL)
export class OrganizationFieldResolver {
  @FieldResolver(() => UserGQL)
  @Authorized()
  async admin(@Root() data: OrganizationDB): Promise<UserDB | null> {
    if (!data.admin) return null;
    const [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, data.admin));
    return user || null;
  }
  @FieldResolver(() => AddressGQL)
  @Authorized()
  async address(@Root() data: OrganizationDB): Promise<AddressDB | null> {
    if (!data.address) return null;
    const [address] = await db
      .select()
      .from(AddressTable)
      .where(eq(AddressTable.id, data.address));
    return address || null;
  }
}
