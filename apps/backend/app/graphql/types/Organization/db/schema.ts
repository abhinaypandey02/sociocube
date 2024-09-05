import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";
import { AddressTable } from "../../Address/db/schema";

export const OrganizationTable = pgTable("organization", {
  id: serial("id").primaryKey(),
  admin: integer("admin").references(() => UserTable.id),
  name: text("name").notNull(),
  logo: text("logo"),
  mobile: text("mobile").notNull(),
  address: integer("address").references(() => AddressTable.id),
});

export type OrganizationDBInsert = typeof OrganizationTable.$inferInsert;
export type OrganizationDB = typeof OrganizationTable.$inferSelect;
