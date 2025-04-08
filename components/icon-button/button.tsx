import classNames from "classnames";
import type { ComponentProps, PropsWithChildren } from "react";
import React from "react";

/**
 * Represents a navbar.
 */
function IconButton(props: PropsWithChildren<ComponentProps<"button">>) {
  return (
    <button
      type="button"
      {...props}
      className={classNames(
        "aspect-square p-2.5 sm:p-2 rounded-full transition-colors hover:bg-gray-100",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}

export default IconButton;
