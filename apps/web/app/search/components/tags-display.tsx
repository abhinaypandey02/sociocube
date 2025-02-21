"use client";
import React from "react";

export default function TagsDisplay({
  tags,
  onClick,
}: {
  tags: string[];
  onClick: (tag: string) => void;
}) {
  if (tags.length === 0) return null;
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <button
          className="rounded-full bg-accent px-3 py-1 text-xs text-white"
          key={tag}
          onClick={() => {
            onClick(tag);
          }}
          type="button"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
