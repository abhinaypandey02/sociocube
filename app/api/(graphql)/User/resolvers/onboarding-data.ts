import { Roles } from "@backend/lib/constants/roles";

import type { UserDB } from "../db";

export function getIsOnboarded(user: UserDB): user is UserDB & {
  photo: string;
  dob: string;
  name: string;
  instagramDetails: number;
  username: string;
  location: number;
} {
  return Boolean(
    (user.role !== Roles.Creator || (user.category && user.gender)) &&
      user.photo &&
      user.dob &&
      user.name &&
      user.instagramDetails &&
      user.username &&
      user.location,
  );
}
