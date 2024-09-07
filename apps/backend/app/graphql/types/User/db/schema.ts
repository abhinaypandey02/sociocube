import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { Roles } from "../../../constants/roles";
import { AuthScopes } from "../../../constants/scopes";

export const rolesEnum = pgEnum("role", [Roles.SELLER]);
export const authScopesEnum = pgEnum("scope", [
  AuthScopes.GOOGLE,
  AuthScopes.INSTAGRAM,
  AuthScopes.EMAIL,
  AuthScopes.PHONE,
]);

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  instagramBusinessId: text("instagramBusinessId"),
  password: text("password"),
  phone: text("phone"),
  photo: text("photo"),
  refreshTokens: text("refresh_tokens").array(),
  scopes: authScopesEnum("scope").array().notNull(),
  roles: rolesEnum("role").array().notNull(),
  otp: integer("otp_id").references(() => OTPTable.id),
  onboardingData: integer("onboarding_data").references(
    () => OnboardingDataTable.id,
  ),
  isOnboarded: boolean("is_onboarded").default(false),
  stripeConnectedAccountID: text("stripe_connected_account_id"),
  stripeSubscriptionID: text("stripe_subscription_id"),
});

export const OTPTable = pgTable("otp", {
  id: serial("id").primaryKey(),
  code: text("code"),
  requestedAt: timestamp("requestedAt"),
});
export const OnboardingDataTable = pgTable("onboarding_data", {
  id: serial("id").primaryKey(),
  name: text("name"),
  photo: text("photo"),
});

export type UserDBInsert = typeof UserTable.$inferInsert;
export type UserDB = typeof UserTable.$inferSelect;
