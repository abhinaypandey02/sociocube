"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateAllPostings() {
  revalidateTag("posting");
}

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateOnlyPostingsPage() {
  revalidateTag("all-postings");
}
