"use server";

import { revalidatePath } from "next/cache";
import { getRoute } from "../constants/routes";

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateAllPostings() {
  revalidatePath(getRoute("Postings"));
  revalidatePath(`${getRoute("Postings")}/[id]/page`, "page");
}

// eslint-disable-next-line -- @typescript-eslint/ require-await
export async function revalidateOnlyPostingsPage() {
  revalidatePath(getRoute("Postings"));
}
