"use client";
import {
  getUserChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { GetChatQuery } from "@/__generated__/graphql";
import { Input } from "@/components/input";
import { useAuthMutation } from "@/lib/apollo-client";
import { useToken, useUser } from "@/lib/auth-client";
import { READ_MESSAGE, SEND_CHAT } from "@/lib/mutations";

import { ChatBubble } from "./chat-bubble";

interface FormValues {
  text: string;
}

export default function ChatWindow({
  chat,
}: {
  chat: NonNullable<GetChatQuery["chat"]>;
}) {
  const [user] = useUser();
  const token = useToken();
  const { register, handleSubmit, resetField } = useForm<FormValues>();
  const [sendMessage] = useAuthMutation(SEND_CHAT);
  const [readMessage] = useAuthMutation(READ_MESSAGE);
  const [messages, setMessages] = useState<
    (NonNullable<GetChatQuery["chat"]>["messages"][number] & {
      loading?: boolean;
      failed?: boolean;
    })[]
  >(chat.messages.toReversed());

  function onSubmit(data: FormValues) {
    if (!user || !data.text) return;
    const index = messages.length;
    resetField("text");
    setMessages((old) => [
      ...old,
      {
        body: data.text,
        createdAt: new Date().getTime(),
        by: user.id,
        loading: true,
      },
    ]);
    if (chat.user?.id)
      sendMessage({
        body: data.text,
        userID: chat.user.id,
      })
        .then((result) => {
          if (!result.data?.sendMessage) {
            setMessages((old) => {
              if (old[index]) old[index].failed = true;
              return [...old];
            });
          }
          setMessages((old) => {
            if (old[index]) old[index].loading = false;
            return [...old];
          });
        })
        .catch(() => {
          setMessages((old) => {
            if (old[index]) old[index].failed = true;
            return [...old];
          });
        });
  }

  useEffect(() => {
    if (chat?.id && user) {
      readMessage({
        conversationID: chat.id,
      });
    }
    const handleNewMessage = (event: CustomEvent) => {
      const detail = event.detail;
        setMessages(prev => [
          ...prev,
          {
            body: detail.message.body,
            by: detail.message.by,
            createdAt: detail.message.createdAt,
          },
        ])
    };
    
    window.addEventListener('new-message-received', handleNewMessage as EventListener);
    
    return () => {
      window.removeEventListener('new-message-received', handleNewMessage as EventListener);
    };
  }, [chat.id, user]);

  return (
    <div className="h-full flex flex-col">
      <div className="grow space-y-2 overflow-y-auto no-scrollbar p-4">
        {user &&
          messages.map((msg, index) => (
            <div
              className={`flex ${msg.by === user?.id ? "justify-end max-sm:pl-14" : "justify-start max-sm:pr-14"}`}
              key={index}
            >
              <ChatBubble
                body={msg.body}
                isCurrentUser={msg.by === user?.id}
                loading={msg.loading}
                failed={msg.failed}
              />
            </div>
          ))}
      </div>
      <form
        className="flex pb-4 px-4 relative w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-full">
          <Input
            placeholder={"Message..."}
            {...register("text", { required: true })}
            className={"rounded-full w-full pr-12"}
          />
          <button
            type="submit"
            className={"absolute right-3 top-1/2 transform -translate-y-1/2"}
          >
            <PaperPlaneTilt className={"text-gray-600"} size={22} />
          </button>
        </div>
      </form>
    </div>
  );
}
