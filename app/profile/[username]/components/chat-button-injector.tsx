import React from "react";
import { getCurrentUser } from "@/lib/apollo-server";
import ChatButton from "./chat-button";

export default async function ChatButtonInjector({ to }: { to: number }) {
  const { user } = await getCurrentUser();
  if (!user) return <ChatButton to={to} />;
  return <ChatButton from={user.id} to={to} />;
}
