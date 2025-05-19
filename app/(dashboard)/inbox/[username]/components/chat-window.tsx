"use client";
import {
  getConversationChannelName,
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
import { cn } from "@/lib/utils";
import { getIsMessageProfanity } from "@/lib/server-actions";

interface FormValues {
  text: string;
}

export interface MessageProfanityCheck {
  isProfane: boolean;
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
      profanity?: boolean;
    })[]
  >(chat.messages.toReversed());
  const [expandedMessages, setExpandedMessages] = useState<
    Record<number, boolean>
  >({});

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
    getIsMessageProfanity(data.text)
      .then((result) => {
        if (result?.isProfane) {
          setMessages((old) => {
            if (old[index]) {
              old[index].profanity = true;
              old[index].loading = false;
            }
            return [...old];
          });
        } else {
          if (chat.user?.id)
            sendMessage({
              body: data.text,
              userID: chat.user.id,
            })
              .then(() => {
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
      })
      .catch((error) => {
        if (chat.user?.id)
          sendMessage({
            body: data.text,
            userID: chat.user.id,
          })
            .then(() => {
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
      });
  }

  const toggleMessageExpand = (index: number) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (chat?.id && user) {
      readMessage({
        conversationID: chat.id,
      });
    }
  }, [chat.id, user]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "",
      channelAuthorization: {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/pusher`,
        transport: "ajax",
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    pusher.subscribe(getConversationChannelName(chat.id));
    pusher.bind(
      NEW_MESSAGE,
      (message: NonNullable<GetChatQuery["chat"]>["messages"][number]) => {
        if (!user) return;
        if (message.by !== user.id) {
          void readMessage({
            conversationID: chat.id,
          });
          setMessages((old) => [
            ...old,
            {
              body: message.body,
              by: message.by,
              createdAt: message.createdAt,
            },
          ]);
        }
      }
    );
    return () => {
      pusher.unbind();
      pusher.unsubscribe(getConversationChannelName(chat.id));
    };
  }, [chat.id, readMessage, token, user]);

  return (
    <div className="h-full flex flex-col">
      <div className="grow space-y-2 overflow-y-auto no-scrollbar p-4">
        {user &&
          messages.map((msg, index) => {
            const charLimit = 200;
            const isLongMessage = msg.body.length > charLimit;
            const isExpanded = !!expandedMessages[index];
            const displayText =
              isLongMessage && !isExpanded
                ? msg.body.substring(0, charLimit) + " ..."
                : msg.body;

            return (
              <div
                className={`flex ${msg.by === user?.id ? "justify-end max-sm:pl-14" : "justify-start max-sm:pr-14"}`}
                key={index}
              >
                <div>
                  <div
                    className={cn(
                      "max-w-sm text-justify rounded-3xl px-4  py-2",
                      msg.by === user?.id
                        ? "bg-accent text-white"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {displayText}
                    {isLongMessage && (
                      <button
                        onClick={() => toggleMessageExpand(index)}
                        className={cn(
                          "block mt-1 underline font-semibold",
                          msg.by === user?.id
                            ? "text-white/80"
                            : "text-gray-500"
                        )}
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>
                  <div
                    className={cn(
                      "text-xs mt-0.5",
                      msg.by === user?.id ? "text-end pr-1" : "pl-1",
                      msg.failed ? "text-red-400" : "text-gray-500"
                    )}
                  >
                    {msg.loading ? "Sending" : null}{" "}
                    {msg.failed ? "Failed" : null}
                    {msg.profanity
                      ? "Message blocked due to potential profanity"
                      : null}
                  </div>
                </div>
              </div>
            );
          })}
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
// chat window auto scroll to bottom
// display visual queue for unread chats
// change schema to incorporate hasRead to every message instead of every conversation
// use textarea for message input
// add message button on the applications table
