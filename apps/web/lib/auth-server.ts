import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Route } from "../constants/routes";

export const getServerToken = cache(async () => {
  const token = cookies().get("refresh")?.value;
  if (!token) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/email`,
    {
      headers: {
        Cookie: `refresh=${token};`,
      },
    },
  );
  if (res.ok) return res.text();
  return null;
});

export function handleUnauthorized() {
  redirect(Route.SignUp);
}

export function handleAuthorized() {
  redirect(Route.Home);
}
