import classNames from "classnames";
import { Variants } from "../../constants";

export const getBaseClassName = (
  variant: Variants,
  isSuffixed: boolean,
  isCheckbox: boolean,
) =>
  classNames(
    `block border-0 py-1.5 px-3 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-inset outline-0 text-base sm:text-sm sm:leading-6`,
    {
      "focus:ring-primary accent-primary": variant === Variants.PRIMARY,
      "focus:ring-accent accent-accent": variant === Variants.ACCENT,
      "focus:ring-dark": variant === Variants.DARK,
    },
    {
      "w-full focus:ring-2 ring-1": !isCheckbox,
    },
    {
      "rounded-l-md": true,
      "rounded-r-md": !isSuffixed,
    },
  );

export const getInputErrorMessages = (type?: string) => {
  if (!type) return undefined;
  switch (type) {
    case "required":
      return "This field is required";
    case "passwordMatch":
      return "Password don't match";
    default:
      return "Invalid field";
  }
};
