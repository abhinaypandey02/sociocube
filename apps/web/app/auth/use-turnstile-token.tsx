import { useEffect, useState } from "react";

declare global {
  interface Window {
    onTurnstileLoad: () => void;
    turnstile: typeof turnstile;
  }
}

function useTurnstileToken(containerID: string) {
  const [turnstileToken, setTurnstileToken] = useState<string>();

  const resetTurnstileToken = () => {
    turnstile.reset();
  };

  useEffect(() => {
    window.onTurnstileLoad = () => {
      turnstile.render(`#${containerID}`, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        callback(token: string) {
          setTurnstileToken(token);
        },
      });
    };
    if (typeof window.turnstile !== "undefined") {
      turnstile.execute(`#${containerID}`, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        callback(token: string) {
          setTurnstileToken(token);
        },
      });
    }
  }, []);
  return { turnstileToken, resetTurnstileToken };
}

export default useTurnstileToken;
