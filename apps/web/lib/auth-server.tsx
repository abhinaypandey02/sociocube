import { cache, Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Route } from "../constants/routes";

export const getServerToken = cache(async () => {
  const token = (await cookies()).get("refresh")?.value;
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

export function Authorizer() {
  return (
    <Suspense>
      <AuthorizerBase />
    </Suspense>
  );
}

async function AuthorizerBase() {
  const token = await getServerToken();
  if (token) {
    handleAuthorized();
  }
  return null;
}

export function handleUnauthorized() {
  redirect(Route.SignUp);
}

export function handleAuthorized() {
  redirect(Route.Home);
}
