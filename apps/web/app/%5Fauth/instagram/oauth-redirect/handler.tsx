"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Route } from "../../../../constants/routes";

function InstagramRedirectHandler({ refresh }: { refresh?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = window.location.hash.split("#")[1];
    const hashParams = new URLSearchParams(params);
    const redirectURL = hashParams.get("state") || searchParams.get("state");
    const error = hashParams.get("error") || searchParams.get("error");
    const accessToken = hashParams.get("access_token");
    const expiresIn = hashParams.get("expires_in");
    if (!error && accessToken && expiresIn)
      router.push(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/instagram?${params}&redirectURL=${redirectURL}&refresh=${refresh}`,
      );
    else if (redirectURL) router.push(redirectURL);
    else router.push(Route.SignUp);
  }, [refresh, router, searchParams]);
  return null;
}
export default InstagramRedirectHandler;
