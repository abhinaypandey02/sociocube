"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { GetChatsQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";

export default function ChatList({ chats }: { chats: GetChatsQuery["chats"] }) {
  const params = useParams();
  const [selectedChat, setSelectedChat] = useState<string | null>();
  useEffect(() => {
    const username = params.username;
    if (typeof username === "string") {
      setSelectedChat(username);
    }
    if (!username) setSelectedChat(undefined);
  }, [params]);
  return (
    <div className={params.username ? "max-lg:hidden" : ""}>
      {chats.map((chat) => (
        <Link
          href={`${getRoute("Inbox")}/${chat.user?.username}`}
          key={chat.id}
          onClick={() => setSelectedChat(chat.user?.username)}
        >
          <div>
            {chat.user?.name} {!chat.hasRead && "(Unread)"}
          </div>
          <div>{chat.preview}</div>
        </Link>
      ))}
    </div>
  );
}
