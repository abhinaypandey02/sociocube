import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { registerEnumType } from "type-graphql";
import { UserTable } from "../../User/db/schema";

export enum InviteType {
  AgencyOwner = "AGENCY_OWNER",
  AgencyAdmin = "AGENCY_ADMIN",
}

registerEnumType(InviteType, {
  name: "InviteType",
});

export const inviteType = pgEnum("invite_type", [
  InviteType.AgencyAdmin,
  InviteType.AgencyOwner,
]);
export const InviteTable = pgTable("invite", {
  id: serial("id").unique(),
  by: integer("by")
    .references(() => UserTable.id)
    .notNull(),
  email: text("email").notNull().unique(),
  type: inviteType("type").notNull(),
  attempts: integer("attempts").default(1).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InviteDB = typeof InviteTable.$inferSelect;
