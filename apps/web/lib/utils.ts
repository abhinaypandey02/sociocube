import { USERNAME_REGEX } from "commons/regex";

export function convertToAbbreviation(number: number) {
  // Create a new Intl.NumberFormat object with options
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits: 3,
  });

  // Format the number and return the result
  return formatter.format(number);
}

export const getUsernameInputRules = (
  isAvailable: (username: string) => Promise<boolean>,
) => ({
  required: true,
  pattern: {
    value: USERNAME_REGEX,
    message: "Username can only contain alphabets, numbers and '-'",
  },
  maxLength: {
    value: 16,
    message: "Username can only contain maximum 16 characters",
  },
  validate: {
    availability: async (username: string) => {
      const result = await isAvailable(username);
      return result || "Username already taken!";
    },
  },
});
