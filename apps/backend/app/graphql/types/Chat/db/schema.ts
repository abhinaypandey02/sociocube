import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { UserTable } from "../../User/db/schema";

export const ConversationTable = pgTable("conversation", {
  id: serial("id").primaryKey(),
  preview: text("preview"),
});

export const ConversationParticipantTable = pgTable(
  "conversation_participant",
  {
    id: serial("id").primaryKey(),
    user: integer("user").references(() => UserTable.id),
    conversation: integer("conversation").references(
      () => ConversationTable.id,
    ),
    hasRead: boolean("has_read").default(true),
  },
);

export const ConversationMessageTable = pgTable("conversation_message", {
  id: serial("id").primaryKey(),
  sender: integer("sender").references(() => UserTable.id),
  conversation: integer("conversation").references(() => ConversationTable.id),
  body: text("body"),
  sentAt: timestamp("sent_at"),
});
