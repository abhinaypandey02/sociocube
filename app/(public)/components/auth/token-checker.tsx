import { cookies } from "next/headers";

import TokenApply from "./token-apply";

export default async function TokenChecker() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/email`, {
    credentials: "include",
    headers: {
      Cookie: (await cookies()).toString(),
    },
  });
  if (!res.ok) return null;
  const token = await res.text();
  if (!token) return null;
  return <TokenApply token={token} />;
}
