"use server";

import { revalidateTag } from "next/cache";

import { getPostingCacheTag } from "@/constants/revalidate";

export async function revalidatePosting(id: number) {
  revalidateTag(getPostingCacheTag(id));
}

export async function revalidateOnlyPostingsPage() {
  revalidateTag("all-postings");
}

export async function revalidateProfilePage(username: string) {
  revalidateTag(`profile-${username}`);
}
