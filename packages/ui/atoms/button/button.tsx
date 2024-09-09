import type { PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { Variants } from "../../constants";
import type { ButtonProps } from "./types";

/**
 * Represents a navbar.
 */
function Button({
  variant = Variants.PRIMARY,
  outline = false,
  children,
  className,
  type,
  loading,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        "rounded-primary ring-0 border px-5 py-1 duration-200 shadow-elevation-2 disabled:brightness-90 active:brightness-90",
        {
          "border-primary": variant === Variants.PRIMARY,
          "border-accent": variant === Variants.ACCENT,
          "border-dark": variant === Variants.DARK,
        },
        !outline && {
          "bg-primary": variant === Variants.PRIMARY,
          "bg-accent": variant === Variants.ACCENT,
          "bg-dark": variant === Variants.DARK,
        },
        !outline && "hover:brightness-95 transition-[filter] text-white",
        outline && "transition-colors",
        outline && {
          "text-primary hover:bg-primary hover:text-white":
            variant === Variants.PRIMARY,
          "text-accent hover:bg-accent hover:text-white":
            variant === Variants.ACCENT,
          "hover:bg-dark hover:text-white": variant === Variants.DARK,
        },
        loading ? "cursor-progress" : "disabled:cursor-not-allowed",
        className,
      )}
      type={
        /* eslint-disable-next-line react/button-has-type -- type comes from the parent button */
        type || "button"
      }
      {...rest}
    >
      {loading ? (
        <CircleNotch className="animate-spin" color="white" size={20} />
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
