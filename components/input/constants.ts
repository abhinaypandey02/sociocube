import { cn } from "@/lib/utils";

export const getBaseClassName = (
  isSuffixed: boolean,
  isPrefixed: boolean,
  isCheckbox: boolean,
) =>
  cn(
    `focus:border-accent accent-accent block border-2 py-2.5 px-4 text-gray-900 shadow-xs border-gray-300 placeholder:text-gray-400 outline-0 text-base sm:leading-6`,
    {
      "w-full focus:border-2 border-1": !isCheckbox,
    },
    {
      "rounded-l-xl": !isPrefixed,
      "rounded-r-xl": !isSuffixed,
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
