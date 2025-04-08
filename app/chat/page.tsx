import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

import { getRoute } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_CHATS } from "@/lib/queries";

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
