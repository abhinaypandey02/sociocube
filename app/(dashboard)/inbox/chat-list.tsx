"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { GetChatsQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import { Input } from "@/components/input";
import UserImage from "@/components/user-image";
import { getRoute } from "@/constants/routes";
import { cn } from "@/lib/utils";

export default function ChatList({ chats }: { chats: GetChatsQuery["chats"] }) {
  const params = useParams();
  const [selectedChat, setSelectedChat] = useState<string | null>();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const username = params.username;
    if (typeof username === "string") {
      setSelectedChat(username);
    }
    if (!username) setSelectedChat(undefined);
  }, [params]);
  const filteredChats = chats.filter(
    (chat) =>
      chat.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.preview?.text?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div
      className={cn(
        params.username ? "max-lg:hidden" : "",
        "border-r border-gray-200 flex flex-col h-full overflow-hidden",
      )}
    >
      <h2 className="pb-4 pt-5 border-b border-gray-200 px-6 font-poppins text-2xl lg:text-3xl font-medium text-gray-800 flex-shrink-0">
        Messages
      </h2>
      <div className="px-6 py-4 border-gray-200">
        <Input
          name="search"
          placeholder="Search conversations..."
          className="text-sm py-2"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="overflow-y-auto flex-grow no-scrollbar">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <Link
              href={`${getRoute("Inbox")}/${chat.user?.username}`}
              key={chat.id}
              onClick={() => setSelectedChat(chat.user?.username)}
              className={cn(
                "flex items-center gap-3 py-3 px-6",
                selectedChat === chat.user?.username ? "bg-gray-50" : "",
              )}
            >
              <UserImage
                size={54}
                photo={chat.user?.photo}
                alt={chat.user?.name || ""}
              />
              <div
                className={cn(
                  "min-w-0 flex-1",
                  !chat.preview?.hasRead ? "font-semibold" : "",
                )}
              >
                <div>{chat.user?.name}</div>
                <div
                  className={cn(
                    chat.preview?.hasRead ? "text-gray-600" : "",
                    "text-sm truncate",
                  )}
                >
                  {chat.preview?.text}
                </div>
              </div>
            </Link>
          ))
        ) : searchTerm ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10 space-y-4">
            <p className="text-gray-600">No conversations found</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10 space-y-4">
            <p className="text-gray-600">Your message inbox is empty</p>
            <p className="text-gray-500 text-sm">
              Start a campaign or find creators to connect directly
            </p>
            <Link href={getRoute("Search")}>
              <Button variant={Variants.ACCENT}>Find Creators</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
