"use server";

import { revalidateTag } from "next/cache";

export async function revalidatePosting(id: number) {
  revalidateTag(`posting-${id}`);
}

export async function revalidateOnlyPostingsPage() {
  revalidateTag("all-postings");
}

export async function revalidateProfilePage(username: string) {
  revalidateTag(`profile-${username}`);
}
