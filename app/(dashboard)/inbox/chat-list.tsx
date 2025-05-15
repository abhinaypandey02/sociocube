"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { GetChatsQuery } from "@/__generated__/graphql";
import UserImage from "@/components/user-image";
import { getRoute } from "@/constants/routes";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        params.username ? "max-lg:hidden" : "",
        "border-r border-gray-200",
      )}
    >
      <h2 className="pb-4 pt-5 border-b border-gray-200 px-6 font-poppins text-2xl lg:text-3xl font-medium text-gray-800">
        Messages
      </h2>
      {chats.map((chat) => (
        <Link
          href={`${getRoute("Inbox")}/${chat.user?.username}`}
          key={chat.id}
          onClick={() => setSelectedChat(chat.user?.username)}
          className={cn(
            "flex items-center gap-3 py-3 px-6",
            selectedChat ? "bg-gray-50" : "",
          )}
        >
          <UserImage
            size={54}
            photo={chat.user?.photo}
            alt={chat.user?.name || ""}
          />
          <div className={!chat.preview?.hasRead ? "font-semibold" : ""}>
            <div>{chat.user?.name}</div>
            <div
              className={cn(
                chat.preview?.hasRead ? "text-gray-600" : "",
                "text-sm",
              )}
            >
              {chat.preview?.text}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
