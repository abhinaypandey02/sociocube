import React from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getCurrentUser, queryGQL } from "../../../lib/apollo-server";
import { GET_CHAT } from "../../../lib/queries";
import { handleUnauthorized } from "../../../lib/auth-server";
import ChatWindow from "./components/chat-window";

interface ChatPage {
  params: Promise<{ userid: string }>;
}
export default async function Page({ params }: ChatPage) {
  const Cookie = await cookies();
  const { user } = await getCurrentUser();
  if (!user) {
    handleUnauthorized();
    return;
  }
  const { chat } = await queryGQL(
    GET_CHAT,
    {
      userid: parseInt((await params).userid),
    },
    Cookie,
  );
  if (!chat) return notFound();

  return (
    <div>
      <div className="flex gap-2">
        {chat.with.photo ? (
          <img
            alt={chat.with.name || ""}
            height={50}
            src={chat.with.photo}
            width={50}
          />
        ) : null}
        {chat.with.name}
      </div>
      <ChatWindow chat={chat} user={user} />
    </div>
  );
}
