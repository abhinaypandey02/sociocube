import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_CHAT, GET_CURRENT_USER } from "../../../lib/queries";
import { getServerToken, handleUnauthorized } from "../../../lib/auth-server";
import ChatWindow from "./components/chat-window";

interface ChatPage {
  params: { userid: string };
}
export default async function Page({ params: { userid } }: ChatPage) {
  const token = await getServerToken();
  if (!token) {
    handleUnauthorized();
    return;
  }
  const { user } = await queryGQL(GET_CURRENT_USER, undefined, token);
  const { chat } = await queryGQL(
    GET_CHAT,
    {
      userid: parseInt(userid),
    },
    token,
  );
  if (!chat) return notFound();

  return (
    <div>
      <div className="flex gap-2">
        {chat.with.photo ? (
          <Image
            alt={chat.with.name || ""}
            height={50}
            src={chat.with.photo}
            width={50}
          />
        ) : null}
        {chat.with.name}
      </div>
      <ChatWindow chat={chat} token={token} user={user} />
    </div>
  );
}
