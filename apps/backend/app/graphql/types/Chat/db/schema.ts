import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";
import { AgencyTable } from "../../Agency/db/schema";

export const ConversationTable = pgTable("conversation", {
  id: serial("id").primaryKey(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  agency: integer("agency")
    .references(() => AgencyTable.id)
    .notNull(),
  hasRead: boolean("has_read").default(false).notNull(),
});

export const ConversationMessageTable = pgTable("conversation_message", {
  id: serial("id").primaryKey(),
  byAgency: boolean("by_agency").notNull(),
  conversation: integer("conversation")
    .references(() => ConversationTable.id)
    .notNull(),
  body: text("body").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
});
export type ConversationDB = typeof ConversationTable.$inferSelect;
