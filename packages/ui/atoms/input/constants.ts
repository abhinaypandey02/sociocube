import classNames from "classnames";
import { Variants } from "../../constants";

export const getBaseClassName = (variant: Variants) =>
  classNames(
    `block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-inset outline-0  sm:text-sm sm:leading-6`,
    {
      "focus:ring-primary": variant === Variants.PRIMARY,
      "focus:ring-accent": variant === Variants.ACCENT,
      "focus:ring-dark": variant === Variants.DARK,
    },
  );
