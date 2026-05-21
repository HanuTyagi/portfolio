"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function IdleProtocol() {
    const router = useRouter();
    const [isIdle, setIsIdle] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        let idleTimer: NodeJS.Timeout;
        let fadeOutTimer: NodeJS.Timeout | null = null;

        const resetIdleTimer = () => {
            if (isIdle) {
                if (!fadeOutTimer && !isFadingOut) {
                    setIsFadingOut(true);
                    fadeOutTimer = setTimeout(() => {
                        setIsIdle(false);
                        setIsFadingOut(false);
                        fadeOutTimer = null;
                    }, 3000);
                }
            }
            
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                if (fadeOutTimer) {
                    clearTimeout(fadeOutTimer);
                    fadeOutTimer = null;
                }
                setIsIdle(true);
                setIsFadingOut(false);
            }, 30000); // 30 seconds
        };

        // Set initial timer
        idleTimer = setTimeout(() => {
            setIsIdle(true);
        }, 30000);

        // Listeners for user activity
        window.addEventListener("mousemove", resetIdleTimer);
        window.addEventListener("mousedown", resetIdleTimer);
        window.addEventListener("keydown", resetIdleTimer);
        window.addEventListener("scroll", resetIdleTimer);
        window.addEventListener("touchstart", resetIdleTimer);

        return () => {
            clearTimeout(idleTimer);
            if (fadeOutTimer) clearTimeout(fadeOutTimer);
            window.removeEventListener("mousemove", resetIdleTimer);
            window.removeEventListener("mousedown", resetIdleTimer);
            window.removeEventListener("keydown", resetIdleTimer);
            window.removeEventListener("scroll", resetIdleTimer);
            window.removeEventListener("touchstart", resetIdleTimer);
        };
    }, [isIdle, isFadingOut]);

    const triggerHobbies = () => {
        router.push("/hobbies");
    };

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
                    transition={
                        isFadingOut 
                            ? { duration: 3, ease: "easeInOut" } 
                            : { duration: 2 }
                    }
                    className="fixed right-6 bottom-6 z-[9999] cursor-pointer"
                    onClick={triggerHobbies}
                    title="Enter the TARDIS"
                >
                    <img 
                        src="/tardis.png" 
                        alt="TARDIS" 
                        className={`w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-110 transition-transform hover:drop-shadow-[0_0_30px_rgba(59,130,246,0.9)] ${!isFadingOut ? 'animate-pulse' : ''}`}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
