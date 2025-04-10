import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { USERNAME_MAX_LENGTH } from "@/constants/constraints";
import { USERNAME_REGEX } from "@/constants/regex";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getGroqResponse<T>(system: string, message?: string) {
  const data = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: system,
        },
        ...(message
          ? [
              {
                role: "user",
                content: message,
              },
            ]
          : []),
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    }),
  }).then(
    (response) =>
      response.json() as Promise<{
        choices?: { message?: { content?: string } }[];
      }>,
  );
  const json = data.choices?.[0]?.message?.content;
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

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
    value: USERNAME_MAX_LENGTH,
    message: "Username can only contain maximum 16 characters",
  },
  validate: {
    availability: async (username: string) => {
      const result = await isAvailable(username);
      return result || "Username already taken!";
    },
  },
});
