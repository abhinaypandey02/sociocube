import { Roles } from "@backend/lib/constants/roles";

import type { UserDB } from "../db";

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
