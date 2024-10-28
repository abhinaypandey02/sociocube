import React from "react";
import { cookies } from "next/headers";
import { queryGQL } from "../../../../lib/apollo-server";
import { GET_CURRENT_USER } from "../../../../lib/queries";
import ChatButton from "./chat-button";

export default async function ChatButtonInjector({ to }: { to: number }) {
  const { user } = await queryGQL(GET_CURRENT_USER, undefined, await cookies());
  if (!user) return <ChatButton to={to} />;
  return <ChatButton from={user.id} to={to} />;
}
