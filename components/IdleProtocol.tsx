"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function IdleProtocol() {
  const router = useRouter();
  const [isIdle, setIsIdle] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isIdleRef = useRef(false);
  const isFadingOutRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isIdleRef.current = isIdle;
    isFadingOutRef.current = isFadingOut;
  }, [isIdle, isFadingOut]);

  useEffect(() => {
    const clearTimers = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      if (fadeOutTimerRef.current) {
        clearTimeout(fadeOutTimerRef.current);
        fadeOutTimerRef.current = null;
      }
    };

    const scheduleIdle = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        setIsFadingOut(false);
      }, 30000);
    };

    const resetIdleTimer = () => {
      if (isIdleRef.current && !isFadingOutRef.current) {
        setIsFadingOut(true);
        if (fadeOutTimerRef.current) {
          clearTimeout(fadeOutTimerRef.current);
        }
        fadeOutTimerRef.current = setTimeout(() => {
          setIsIdle(false);
          setIsFadingOut(false);
        }, 3000);
      }
      scheduleIdle();
    };

    scheduleIdle();

    window.addEventListener("mousemove", resetIdleTimer, { passive: true });
    window.addEventListener("mousedown", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    window.addEventListener("scroll", resetIdleTimer, { passive: true });
    window.addEventListener("touchstart", resetIdleTimer, { passive: true });

    return () => {
      clearTimers();
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("mousedown", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      window.removeEventListener("scroll", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            isFadingOut
              ? { opacity: [1, 0.2, 0.8, 0.1, 0.5, 0], scale: [1, 0.95, 1, 0.9, 0.95, 0.8] }
              : { opacity: 1, scale: 1 }
          }
          exit={{ opacity: 0 }}
          transition={isFadingOut ? { duration: 3, ease: "easeInOut" } : { duration: 2 }}
          className="fixed right-6 bottom-6 z-[9999] cursor-pointer"
          onClick={() => router.push("/hobbies")}
          title="Enter the TARDIS"
        >
          <img
            src="/tardis.png"
            alt="TARDIS"
            className={`w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_20px_rgba(0,217,255,0.6)] hover:scale-110 transition-transform hover:drop-shadow-[0_0_30px_rgba(0,217,255,0.9)] ${!isFadingOut ? "animate-pulse" : ""}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
