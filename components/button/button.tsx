import type { PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { Variants } from "@/components/constants";
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
      className={classNames(
        "relative ring-0 border  duration-200 flex justify-center transition-all  font-semibold leading-6 shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        borderless && "border-none shadow-none",
        square ? "p-3" : compact ? "px-3 py-1 " : "px-4 py-2 ",
        compact ? "rounded-lg" : "rounded-xl",
        variant === Variants.PRIMARY && {
          "focus-visible:outline-primary bg-primary": true,
          "border-primary": !borderless,
          "text-primary ": invert,
        },
        variant === Variants.ACCENT && {
          "focus-visible:outline-accent bg-accent": true,
          "border-accent": !borderless,
          "text-accent ": invert,
        },
        variant === Variants.DARK && {
          "focus-visible:outline-dark bg-dark": true,
          "border-dark": !borderless,
          "text-dark ": invert,
        },
        !disabled && !loading && "active:brightness-110",
        !invert &&
          "disabled:bg-opacity-50 disabled:border-opacity-0 hover:brightness-95 transition-[filter] text-white",
        invert && " bg-opacity-0 hover:bg-opacity-10 disabled:text-opacity-80",
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
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
