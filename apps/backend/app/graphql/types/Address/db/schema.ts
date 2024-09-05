import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const AddressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  country: text("country"),
  state: text("state"),
  city: text("city"),
  line: text("line").notNull(),
  line2: text("line2"),
  latitude: integer("latitude"),
  longitude: integer("longitude"),
});

export type AddressDBInsert = typeof AddressTable.$inferInsert;
export type AddressDB = typeof AddressTable.$inferSelect;
