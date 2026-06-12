"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", 
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", 
    "b", "a"
];

const TerminalSequence = ({ onClose }: { onClose: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    const sequence = [
        "INITIATING OVERRIDE PROTOCOL...",
        "BYPASSING MAINFRAME FIREWALLS...",
        "DECRYPTING ADMIN CREDENTIALS...",
        "ACCESS GRANTED.",
        "WELCOME, SYSTEM ADMINISTRATOR.",
        "THREAT MAP: ONLINE."
    ];

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < sequence.length) {
                setLines(prev => [...prev, sequence[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black text-emerald-500 font-mono flex flex-col p-8 overflow-hidden"
        >
            {/* Radar Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="relative w-[800px] h-[800px] border border-emerald-500 rounded-full">
                    <div className="absolute inset-0 border border-emerald-500/50 rounded-full scale-75"></div>
                    <div className="absolute inset-0 border border-emerald-500/30 rounded-full scale-50"></div>
                    <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-25"></div>
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-500/50"></div>
                    <div className="absolute left-1/2 top-0 w-[1px] h-full bg-emerald-500/50"></div>
                    {/* Radar Sweep */}
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-top-left animate-[spin_4s_linear_infinite] bg-gradient-to-br from-emerald-500/40 to-transparent rounded-br-full border-r border-b border-emerald-400"></div>
                </div>
            </div>

            {/* Terminal Text */}
            <div className="relative z-10 flex-1">
                {lines.map((line, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xl md:text-3xl mb-4 ${line?.includes("GRANTED") || line?.includes("WELCOME") ? "text-white font-bold" : ""}`}
                    >
                        {`> ${line || ""}`}
                    </motion.div>
                ))}
                {lines.length < sequence.length && (
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-4 h-8 bg-emerald-500 align-middle"
                    />
                )}
            </div>

            {/* Matrix Fall Overlay */}
            {lines.length >= sequence.length && (
                <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="absolute top-[-100%] text-sm font-bold whitespace-nowrap animate-matrix-fall"
                            style={{
                                left: `${i * 2.5}%`,
                                animationDuration: `${Math.random() * 2 + 2}s`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        >
                            {Array.from({ length: 50 }).map(() => String.fromCharCode(33 + Math.random() * 94)).join("\n")}
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={onClose}
                className="relative z-20 mt-auto self-start px-6 py-3 border border-red-500 text-red-500 hover:bg-red-500/20 transition-colors uppercase tracking-widest font-bold"
            >
                [ TERMINATE SESSION ]
            </button>
        </motion.div>
    );
};

export default function KonamiCode() {
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const [breachStage, setBreachStage] = useState<"idle" | "shaking" | "terminal">("idle");
    const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (breachStage !== "idle") return;

            setInputSequence(prev => {
                const newSequence = [...prev, e.key];
                if (newSequence.length > KONAMI_CODE.length) {
                    newSequence.shift();
                }

                if (newSequence.join(",") === KONAMI_CODE.join(",")) {
                    // Trigger breach
                    setBreachStage("shaking");
                    transitionTimeoutRef.current = setTimeout(() => {
                        setBreachStage("terminal");
                    }, 1500); // Shake for 1.5s then show terminal
                    return [];
                }

                return newSequence;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
            }
        };
    }, [breachStage]);

    // Apply shake effect to body
    useEffect(() => {
        if (breachStage === "shaking") {
            document.body.style.animation = "shake 0.1s infinite";
            document.body.style.filter = "sepia(1) hue-rotate(-50deg) saturate(5) invert(0.8)"; // Red flash
        } else {
            document.body.style.animation = "";
            document.body.style.filter = "";
        }
    }, [breachStage]);

    return (
        <>
            <style jsx global>{`
                @keyframes shake {
                    0% { transform: translate(2px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(0px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(2px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(2px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
            `}</style>

            <AnimatePresence>
                {breachStage === "terminal" && (
                    <TerminalSequence onClose={() => setBreachStage("idle")} />
                )}
            </AnimatePresence>
        </>
    );
}
