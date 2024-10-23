import React from "react";
import Link from "next/link";
import { getServerToken, handleUnauthorized } from "../../lib/auth-server";
import { queryGQL } from "../../lib/apollo-server";
import { GET_CHATS } from "../../lib/queries";
import { Route } from "../../constants/routes";

export default async function AllChatPage() {
  const token = await getServerToken();
  if (!token) {
    handleUnauthorized();
    return;
  }
  const { chats } = await queryGQL(GET_CHATS, {}, token);
  return (
    <div>
      {chats.map((chat) => (
        <Link href={`${Route.Chat}/${chat.with.id}`} key={chat.id}>
          <div>
            {chat.with.name} {!chat.hasRead && "(Unread)"}
          </div>
          <div>{chat.preview}</div>
        </Link>
      ))}
    </div>
  );
}
