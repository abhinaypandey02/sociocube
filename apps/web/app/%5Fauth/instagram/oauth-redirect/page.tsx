import { Suspense } from "react";
import { cookies } from "next/headers";
import InstagramRedirectHandler from "./handler";

export default function InstagramRedirectHandlerPage() {
  const refresh = cookies().get("refresh")?.value;
  return (
    <Suspense>
      <InstagramRedirectHandler refresh={refresh} />
    </Suspense>
  );
}
