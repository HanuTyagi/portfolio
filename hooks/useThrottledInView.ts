"use client";

import { useEffect, useRef, useState } from "react";

interface UseThrottledInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useThrottledInView({
  threshold = 0.15,
  rootMargin = "0px",
}: UseThrottledInViewOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView || !ref.current) {
      return;
    }

    let rafId: number | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
    };
  }, [isInView, rootMargin, threshold]);

  return { ref, isInView };
}
