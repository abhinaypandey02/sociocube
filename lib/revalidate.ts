"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidatePosting(id:number) {
  revalidateTag(`posting-${id}`);
}

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateOnlyPostingsPage() {
  revalidateTag("all-postings");
}

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateProfilePage(username:string) {
  revalidateTag(`profile-${username}`);
}
