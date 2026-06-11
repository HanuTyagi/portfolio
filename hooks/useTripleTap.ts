"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseTripleTapOptions {
  requiredTaps?: number;
  timeoutMs?: number;
  onTripleTap: () => void;
}

export function useTripleTap({
  requiredTaps = 3,
  timeoutMs = 600,
  onTripleTap,
}: UseTripleTapOptions) {
  const [tapCount, setTapCount] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTapCount = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setTapCount(0);
  }, []);

  const handleTap = useCallback(() => {
    setTapCount((previousCount) => {
      const nextCount = previousCount + 1;

      if (nextCount >= requiredTaps) {
        onTripleTap();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        return 0;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setTapCount(0);
      }, timeoutMs);

      return nextCount;
    });
  }, [onTripleTap, requiredTaps, timeoutMs]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { tapCount, handleTap, resetTapCount };
}
