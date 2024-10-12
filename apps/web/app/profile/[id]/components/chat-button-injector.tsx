import React from "react";
import { queryGQL } from "../../../../lib/apollo-server";
import { GET_CURRENT_USER } from "../../../../lib/queries";
import { getServerToken } from "../../../../lib/auth-server";
import ChatButton from "./chat-button";

export default async function ChatButtonInjector({ to }: { to: number }) {
  const token = await getServerToken();
  const { user } = await queryGQL(GET_CURRENT_USER, undefined, token);
  return <ChatButton from={user.id} to={to} />;
}
