import classNames from "classnames";

export const getBaseClassName = (
  isSuffixed: boolean,
  isPrefixed: boolean,
  isCheckbox: boolean,
) =>
  classNames(
    `focus:ring-accent accent-accent block border-0 py-2.5 px-4 text-gray-900 shadow-sm  ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-inset outline-0 text-base sm:leading-6`,
    {
      "w-full focus:ring-2 ring-1": !isCheckbox,
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
