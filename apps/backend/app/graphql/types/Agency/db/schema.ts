import { pgTable, text, integer, serial, pgEnum } from "drizzle-orm/pg-core";
import { LocationTable, UserTable } from "../../User/db/schema";
import { InstagramDetails } from "../../Instagram/db/schema";
import { AgencyMemberType } from "../../../constants/agency-member-type";
import { Roles } from "../../../constants/roles";

export const agencyRolesEnum = pgEnum("agency_role", [
  Roles.ADMIN,
  Roles.ReferralCreator,
  Roles.ManuallyVerified,
]);
export const AgencyTable = pgTable("agency", {
  id: serial("id").unique(),
  name: text("name").notNull(),
  photo: text("photo").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  location: integer("location")
    .references(() => LocationTable.id)
    .notNull(),
  about: text("about"),
  roles: agencyRolesEnum("role").array().notNull(),
  username: text("username").notNull(),
  instagramDetails: integer("instagram_details").references(
    () => InstagramDetails.id,
  ),
});
export const AgencyOnboardingTable = pgTable("agency_onboarding", {
  id: serial("id").unique(),
  name: text("name").notNull(),
  photo: text("photo"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  about: text("about").notNull(),
  username: text("username"),
  instagramDetails: integer("instagram_details")
    .references(() => InstagramDetails.id)
    .notNull(),
  user: integer("user")
    .references(() => UserTable.id)
    .notNull(),
});

export const agencyMemberType = pgEnum("agency_member_type", [
  AgencyMemberType.Admin,
  AgencyMemberType.Owner,
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

export type AgencyDB = typeof AgencyTable.$inferSelect;
export type AgencyOnboardingDB = typeof AgencyOnboardingTable.$inferSelect;
