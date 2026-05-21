"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Scanner() {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);
    const [alertText, setAlertText] = useState("[ Initialize Threat Scan ]");

    const triggerScan = () => {
        if (isScanning) {
            setAlertText("[ THREAT DETECTED! DEPLOYING ARSENAL... ]");
            setTimeout(() => {
                router.push("/arsenal");
            }, 800);
            return;
        }

        setIsScanning(true);
        setAlertText("[ Scanning System... ]");
        setTimeout(() => {
            setIsScanning(false);
            setAlertText("[ Initialize Threat Scan ]");
        }, 3000);
    };

    useEffect(() => {
        if (isScanning) {
            document.body.classList.add("scanning-active");
        } else {
            document.body.classList.remove("scanning-active");
        }

        return () => {
            document.body.classList.remove("scanning-active");
        };
    }, [isScanning]);

    return (
        <>
            <div className="text-center mt-4">
                <button 
                    onClick={triggerScan}
                    className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                        alertText.includes("THREAT DETECTED") 
                        ? "text-red-400 border border-red-500 bg-red-500/10" 
                        : "text-emerald-400 hover:text-emerald-300 border border-emerald-400/30 hover:border-emerald-300"
                    }`}
                >
                    {alertText}
                </button>
            </div>

            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.5, ease: "linear" }}
                        className="fixed left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_5px_rgba(239,68,68,0.5)] z-[9999] pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
