import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { queryGQL } from "../../lib/apollo-server";
import { GET_CHATS } from "../../lib/queries";
import { getRoute } from "../../constants/routes";

export default async function AllChatPage() {
  const { chats } = await queryGQL(GET_CHATS, {}, await cookies());
  return (
    <div>
      {chats.map((chat) => (
        <Link href={`${getRoute("Chat")}/${chat.id}`} key={chat.id}>
          <div>
            {chat.agency?.name || chat.user?.name} {!chat.hasRead && "(Unread)"}
          </div>
          <div>{chat.preview}</div>
        </Link>
      ))}
    </div>
  );
}
