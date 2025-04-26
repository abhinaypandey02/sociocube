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
    (user.role !== Roles.Creator ||
      (user.category && user.gender && user.instagramDetails && user.dob)) &&
      user.photo &&
      user.name &&
      user.username &&
      user.location,
  );
}
