import {UserDB} from "../../db/schema";

export function getIsOnboarded(user: UserDB) {
  return Boolean(
    user.photo &&
      user.name &&
      user.category &&
      user.gender &&
      user.instagramDetails &&
      user.location &&
      user.isOnboarded,
  );
}
