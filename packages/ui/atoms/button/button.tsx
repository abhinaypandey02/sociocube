import type { PropsWithChildren } from "react";
import React from "react";
import classNames from "classnames";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react/dist/ssr";
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
  success,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        "ring-0 border duration-200 disabled:brightness-90 active:brightness-90 flex justify-center rounded-md px-5 py-1.5  font-semibold leading-6 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        !success && {
          "border-primary": variant === Variants.PRIMARY,
          "border-accent": variant === Variants.ACCENT,
          "border-dark": variant === Variants.DARK,
        },
        success && "bg-green-400 border-green-500",
        !outline &&
          !success && {
            "bg-primary": variant === Variants.PRIMARY,
            "bg-accent": variant === Variants.ACCENT,
            "bg-dark": variant === Variants.DARK,
          },
        !outline && "hover:brightness-95 transition-[filter] text-white",
        outline && "transition-colors bg-white",
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
      disabled={success || disabled}
      type={
        /* eslint-disable-next-line react/button-has-type -- type comes from the parent button */
        type || "button"
      }
      {...rest}
    >
      {!success && loading ? (
        <CircleNotch className="animate-spin" color="white" size={20} />
      ) : null}
      {success ? <CheckCircle color="white" size={20} /> : null}
      {!loading && !success && children}
    </button>
  );
}

export default Button;
