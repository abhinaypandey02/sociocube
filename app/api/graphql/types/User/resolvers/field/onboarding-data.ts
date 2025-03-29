import type { UserDB } from "../../db/schema";
import { Roles } from "@graphql/constants/roles";

export function getIsOnboarded(user: UserDB) {
  return Boolean(
    (user.role !== Roles.Creator || (user.category && user.gender)) &&
      user.photo &&
      user.name &&
      user.instagramDetails &&
      user.username &&
      user.location,
  );
}
