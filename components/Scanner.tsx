"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function Scanner() {
    const router = useRouter();
    const { increaseThreat, unlockEgg } = useInvestigation();
    const [isScanning, setIsScanning] = useState(false);
    const [surfaceCount, setSurfaceCount] = useState(0);
    const [alertText, setAlertText] = useState("[ Initialize Vulnerability Scanner ]");

    const triggerScan = () => {
        if (isScanning) {
            setAlertText("[ SCAN ACTIVE ] exploitable endpoints routed to arsenal...");
            setTimeout(() => router.push("/arsenal"), 800);
            return;
        }

        const count = document.querySelectorAll("a, button, [role='button'], input, [data-vulnerability]").length;
        setSurfaceCount(count);
        setIsScanning(true);
        setAlertText(`[SCAN ACTIVE] ${count} exploitable endpoints found`);
        unlockEgg("scanner_sweep");
        increaseThreat(15, "vulnerability scanner");
        setTimeout(() => {
            setIsScanning(false);
            setAlertText("[ Initialize Vulnerability Scanner ]");
        }, 3500);
    };

    useEffect(() => {
        document.body.classList.toggle("scanning-active", isScanning);
        return () => document.body.classList.remove("scanning-active");
    }, [isScanning]);

    return (
        <>
            <div className="mt-4 text-center">
                <button 
                    onClick={triggerScan}
                    className={`rounded px-3 py-1 font-mono text-xs transition-colors ${
                        isScanning
                        ? "border border-red-500 bg-red-500/10 text-red-300"
                        : "border border-cyan-400/30 text-cyan-300 hover:border-pink-300 hover:text-pink-200"
                    }`}
                    title={isScanning ? `Found ${surfaceCount} interactive surfaces. Red=vulnerable, blue=patched.` : "Scan for interactive surfaces"}
                >
                    {alertText}
                </button>
                {isScanning && <p className="mt-2 font-mono text-[10px] text-slate-400">Hover highlighted nodes for threat level + exploitation guide.</p>}
            </div>

            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ top: "-10%" }}
                        animate={{ top: "110%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.8, ease: "linear" }}
                        className="pointer-events-none fixed left-0 z-[9999] h-1 w-full bg-red-500 shadow-[0_0_20px_5px_rgba(239,68,68,0.5)]"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
