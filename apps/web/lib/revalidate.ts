"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getRoute } from "../constants/routes";

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateAllPostings() {
  revalidateTag("posting");
}

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateOnlyPostingsPage() {
  revalidateTag("all-postings");
}

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateProfilePage(username:string) {
  revalidatePath(`${getRoute("Profile")}/${username}`);
}
