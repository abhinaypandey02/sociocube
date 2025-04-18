import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import type { PropsWithChildren } from "react";
import React from "react";

import { Variants } from "@/components/constants";
import { cn } from "@/lib/utils";

import type { ButtonProps } from "./types";

/**
 * Represents a navbar.
 */
function Button({
  variant = Variants.PRIMARY,
  invert = false,
  borderless = false,
  square = false,
  children,
  className,
  type,
  loading,
  disabled,
  compact,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "relative disabled:brightness-80 duration-200 flex justify-center items-center transition-all font-semibold leading-6 focus-visible:outline-2 focus-visible:outline-offset-2",
        borderless ? "border-none" : !invert && "shadow-sm",
        square ? "p-3" : compact ? "px-4 py-1 " : "px-4 py-2 ",
        compact ? "rounded-lg" : "rounded-xl",
        variant === Variants.PRIMARY && {
          "focus-visible:outline-primary bg-gradient-primary ": !invert,
          "text-primary border-primary hover:bg-primary/10": invert,
        },
        variant === Variants.ACCENT && {
          "focus-visible:outline-accent bg-gradient-accent": !invert,
          "text-accent border-accent hover:bg-accent/10": invert,
        },
        variant === Variants.DARK && {
          "focus-visible:outline-dark bg-gradient-dark": !invert,
          "text-dark border-dark hover:bg-dark/10": invert,
        },
        !disabled && !loading && "active:brightness-95",
        !invert && "hover:brightness-90 transition-[filter] text-white",
        invert && "border shadow-light-button",
        loading ? "cursor-progress" : "disabled:cursor-not-allowed",
        className,
      )}
      disabled={disabled || loading}
      type={type || "button"}
      {...rest}
    >
      {loading ? (
        <>
          <span className="absolute left-1/2 -translate-x-1/2 ">
            <CircleNotch className=" animate-spin" size={24} weight="bold" />
          </span>
          <span className="opacity-0 flex">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
