import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { CHAR_LIMIT } from "../../constants";
import { URL_REGEX } from "@/constants/regex";

interface ChatBubbleProps {
  body: string;
  isCurrentUser: boolean;
  loading?: boolean;
  failed?: boolean;
}

function linkify(text: string, isCurrentUser: boolean) {
  const parts = text.split(URL_REGEX);

  return parts.map((part, index) => {
    if (part.match(URL_REGEX)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "underline break-all",
            isCurrentUser
              ? "text-white hover:text-white/80"
              : "text-blue-600 hover:text-blue-800",
          )}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  body,
  isCurrentUser,
  loading,
  failed,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongMessage = body.length > CHAR_LIMIT;

  const displayText =
    isLongMessage && !isExpanded
      ? body.substring(0, CHAR_LIMIT) + " ..."
      : body;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <div
        className={cn(
          "max-w-sm text-justify rounded-3xl px-4 py-2",
          isCurrentUser ? "bg-accent text-white" : "bg-gray-100 text-gray-700",
        )}
      >
        <div className="break-words leading-normal">
          {linkify(displayText, isCurrentUser)}
        </div>
        {isLongMessage && (
          <button
            onClick={toggleExpand}
            className={cn(
              "block mt-1 underline font-semibold",
              isCurrentUser ? "text-white/80" : "text-gray-500",
            )}
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      <div
        className={cn(
          "text-xs mt-0.5",
          isCurrentUser ? "text-end pr-1" : "pl-1",
          failed ? "text-red-400" : "text-gray-500",
        )}
      >
        {loading ? "Sending" : null} {failed ? "Unable to send" : null}
      </div>
    </div>
  );
};
