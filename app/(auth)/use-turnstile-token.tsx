import { useEffect, useState } from "react";

declare global {
  interface Window {
    onTurnstileLoad: () => void;
    turnstile: typeof turnstile;
  }
}

function useTurnstileToken(containerID: string) {
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const [loading, setLoading] = useState(false);

  const resetTurnstileToken = () => {
    setTurnstileToken(undefined);
    turnstile.reset();
  };

  useEffect(() => {
    window.onTurnstileLoad = () => {
      if (!loading && !turnstileToken) {
        setLoading(true);
        turnstile.render(`#${containerID}`, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
          callback(token: string) {
            setLoading(false);
            setTurnstileToken(token);
          },
        });
      }
    };
    if (
      typeof window.turnstile !== "undefined" &&
      !loading &&
      !turnstileToken
    ) {
      setLoading(true);
      turnstile.execute(`#${containerID}`, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        callback(token: string) {
          setLoading(false);
          setTurnstileToken(token);
        },
      });
    }
  }, [loading, turnstileToken]);
  return { turnstileToken, resetTurnstileToken };
}

export default useTurnstileToken;
