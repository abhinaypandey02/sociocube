import { useCallback, useEffect, useRef, useState } from 'react';

interface UseVisibilityOptions {
  threshold?: number;
  rootMargin?: string;
  onVisible?: () => void;
}

export function useVisibility<T extends Element>(
  options: UseVisibilityOptions = {}
): [(node: T | null) => void, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<T | null>(null);
  const hasTriggeredRef = useRef(false);

  const clearObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    elementRef.current = null;
    setIsVisible(false);
    hasTriggeredRef.current = false;
  }, []);

  const setRef = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    elementRef.current = node;
    hasTriggeredRef.current = false;

    if (node && typeof window !== 'undefined' && window.IntersectionObserver) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries.length > 0) {
            const entry = entries[0];
            if (entry && entry.isIntersecting) {
              
              if (!hasTriggeredRef.current) {
                hasTriggeredRef.current = true;
                setIsVisible(true);
                
                
                if (options.onVisible) {
                  options.onVisible();
                }
                
                
                setTimeout(() => {
                  clearObserver();
                }, 0);
              }
            } else if (entry && !entry.isIntersecting) {
              setIsVisible(false);
            }
          }
        },
        {
          threshold: options.threshold ?? 0.1,
          rootMargin: options.rootMargin ?? '0px',
        }
      );

      observerRef.current.observe(node);
    } else {
      setIsVisible(false);
    }
  }, [options.threshold, options.rootMargin, options.onVisible, clearObserver]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [setRef, isVisible];
}