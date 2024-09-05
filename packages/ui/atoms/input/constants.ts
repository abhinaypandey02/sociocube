import classNames from "classnames";
import { Variants } from "../../constants";

export const getBaseClassName = (variant: Variants) =>
  classNames(
    `rounded-primary shadow-elevation-2 px-4 py-2 border-2 border-dark placeholder:opacity-50  outline-0`,
    {
      "focus:border-primary": variant === Variants.PRIMARY,
      "focus:border-accent": variant === Variants.ACCENT,
      "focus:border-dark": variant === Variants.DARK,
    },
  );
