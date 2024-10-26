import React from "react";

export default function TagsDisplay({
  tags,
  onClick,
}: {
  tags: string[];
  onClick: (tag: string) => void;
}) {
  return (
    <div className="my-2 flex gap-2">
      {tags.map((tag) => (
        <button
          className="rounded-full bg-accent px-2 py-1 text-white"
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
