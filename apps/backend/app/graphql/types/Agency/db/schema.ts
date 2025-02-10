import { pgTable, text, integer, serial, pgEnum } from "drizzle-orm/pg-core";
import { LocationTable, UserTable } from "../../User/db/schema";
import { InstagramDetails } from "../../Instagram/db/schema";
import { AgencyMemberType } from "../../../constants/agency-member-type";

export const AgencyTable = pgTable("agency", {
  id: serial("id").unique(),
  name: text("name").notNull(),
  photo: text("photo").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  location: integer("location").references(() => LocationTable.id),
  about: text("about"),
  username: text("username").notNull(),
  instagramDetails: integer("instagram_details").references(
    () => InstagramDetails.id,
  ),
});

export const agencyMemberType = pgEnum("agency_member_type", [
  AgencyMemberType.Admin,
]);

export const AgencyMember = pgTable("agency_member", {
  id: serial("id").unique(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
  agency: integer("agency")
    .references(() => AgencyTable.id)
    .notNull(),
  type: agencyMemberType("type").notNull(),
});

export type ApplicationDB = typeof AgencyTable.$inferSelect;
