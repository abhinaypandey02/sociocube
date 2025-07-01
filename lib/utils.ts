import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { USERNAME_MAX_LENGTH } from "@/constants/constraints";
import { USERNAME_REGEX } from "@/constants/regex";

export function extractFormsLink(text: string) {
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf("http");

  if (index === -1) return null;

  // Find all URLs starting with http or https
  const parts = text.split(/\s+/); // split by whitespace
  for (const part of parts) {
    if (part.startsWith("http") && part.includes("forms")) {
      // Remove trailing punctuation if any
      return part.replace(/[.,!?)]*$/, "");
    }
  }

  return null; // no link with "forms" found
}

export async function getMetaInfo(url: string | null) {
  if (!url) return null;
  const response = await fetch(url);
  const html = await response.text();
  if (html.includes("is no longer accepting responses.")) return null;
  // Extract <title>
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || "";

  // Extract meta[name="description"]
  const descMatch = html.match(
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
  );
  let description = descMatch?.[1];

  // Fallback to meta[property="og:description"]
  if (!description) {
    const ogDescMatch = html.match(
      /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i,
    );
    description = ogDescMatch?.[1];
  }

  description = description || "";

  return { title, description };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum HandleImageUploadType {
  PROFILE_PICTURE,
  PORTFOLIO,
}
export async function handleImageUpload(
  file: FormData,
  token: string,
  key?: HandleImageUploadType,
) {
  return fetch("/api/handle-image-upload" + (key ? `?key=${key}` : ""), {
    method: "PUT",
    body: file,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => (await res.text()) || null);
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
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
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

export function convertToAbbreviation(number?: number | null) {
  if (!number) return "0";
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

export function getProxiedForInstagramURL(url?: string | null) {
  return url?.includes("instagram.com") || url?.includes("fbcdn.net")
    ? "/api/image-proxy?url=" + url
    : url;
}
