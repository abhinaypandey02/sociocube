import { useEffect, useRef } from "react";

export function useVisibility(onVisible?: () => void) {
  const visibilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onVisible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target?.isIntersecting) {
          onVisible();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    const currentTarget = visibilityRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [onVisible]);
  return visibilityRef;
}
