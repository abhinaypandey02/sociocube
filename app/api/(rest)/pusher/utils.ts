export const NEW_MESSAGE = "new-message";

const User_CHANNEL_NAME_PREFIX = "private-user-";
export function getUserChannelName(userId: number) {
  return `${User_CHANNEL_NAME_PREFIX}${userId}`;
}
