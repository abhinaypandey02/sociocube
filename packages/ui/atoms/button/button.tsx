import type { PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
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
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        "rounded-primary ring-0 border px-5 py-1 duration-200 shadow-elevation-2 active:brightness-90",
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
        className,
      )}
      type={
        /* eslint-disable-next-line react/button-has-type -- type comes from the parent button */
        type || "button"
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
