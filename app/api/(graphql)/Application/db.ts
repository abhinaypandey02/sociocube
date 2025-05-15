import { ReviewTable } from "@graphql/Review/db";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { registerEnumType } from "type-graphql";

import { PostingTable } from "../Posting/db";
import { UserTable } from "../User/db";

export enum ApplicationStatus {
  Applied = "APPLIED",
  Rejected = "REJECTED",
  Denied = "DENIED",
  Shortlisted = "SHORTLISTED",
  Selected = "SELECTED",
}

registerEnumType(ApplicationStatus, { name: "ApplicationStatus" });

export const applicationStatusEnum = pgEnum("application_status_enum", [
  ApplicationStatus.Applied,
  ApplicationStatus.Shortlisted,
  ApplicationStatus.Selected,
  ApplicationStatus.Rejected,
  ApplicationStatus.Denied,
]);

export const ApplicationTable = pgTable(
  "application",
  {
    id: serial("id").unique(),
    user: integer("user")
      .references(() => UserTable.id)
      .notNull(),
    posting: integer("posting")
      .references(() => PostingTable.id)
      .notNull(),
    comment: text("comment"),
    review: integer("review").references(() => ReviewTable.id),
    status: applicationStatusEnum("status")
      .default(ApplicationStatus.Applied)
      .notNull(),
    external: boolean("external").default(false),
    referralEarnings: integer("referral_earnings").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userPostingPrimaryKey: primaryKey({ columns: [table.user, table.posting] }),
  }),
);

export type ApplicationDB = typeof ApplicationTable.$inferSelect;
