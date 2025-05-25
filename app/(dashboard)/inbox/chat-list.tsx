"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { GetChatsQuery } from "@/__generated__/graphql";
import UserImage from "@/components/user-image";
import { getRoute } from "@/constants/routes";
import { cn } from "@/lib/utils";
import Pusher from "pusher-js";
import { getUserChannelName } from "@/app/api/(rest)/pusher/utils";
import { NEW_MESSAGE } from "@/app/api/(rest)/pusher/utils";
import { useToken, useUser } from "@/lib/auth-client";
import { GetChatQuery } from "@/__generated__/graphql";

export default function ChatList({ chats }: { chats: GetChatsQuery["chats"] }) {
  const params = useParams();
  const [selectedChat, setSelectedChat] = useState<string | null>();
  const [user] = useUser();
  const token = useToken();
  const [chatList, setChatList] = useState<GetChatsQuery["chats"]>(chats);
  useEffect(() => {
    const username = params.username;
    if (typeof username === "string") {
      setSelectedChat(username);
    }
    if (!username) setSelectedChat(undefined);
  }, [params]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "",
      channelAuthorization: {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/pusher`,
        transport: "ajax",
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    if (user) {
      pusher.subscribe(getUserChannelName(user.id));
      pusher.bind(
        NEW_MESSAGE,
        (
          message: NonNullable<GetChatQuery["chat"]>["messages"][number] & {
            conversation: number;
            username: string;
          }
        ) => {
          setChatList((old) => {
            const chat = old.find((chat) => chat.id === message.conversation);
            if (!chat) return old;
            chat.preview = {
              text: message.body,
              hasRead: selectedChat === message.username,
              at: message.createdAt,
            };
            return [...old];
          });
        }
      );
      return () => {
        pusher.unbind();
        if (user) {
          pusher.unsubscribe(getUserChannelName(user.id));
        }
      };
    }
  }, [token, user]);

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
      <div className="overflow-y-auto flex-grow no-scrollbar">
        {chatList.length > 0 ? (
          chatList.map((chat) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10 space-y-4">
            <p className="text-gray-600">Your message inbox is empty</p>
            <p className="text-gray-500 text-sm">
              Start a campaign or find creators to connect directly
            </p>
            <Link
              href={getRoute("Search")}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Find Creators
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
