"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Typewriter = ({ lines, delay = 0 }: { lines: string[]; delay?: number }) => {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let typingInterval: NodeJS.Timeout;

        const startTyping = () => {
            let currentLineIdx = 0;
            let currentCharIdx = 0;
            const newLines: string[] = [];

            typingInterval = setInterval(() => {
                if (currentLineIdx < lines.length) {
                    const currentLine = lines[currentLineIdx];
                    if (currentCharIdx < currentLine.length) {
                        if (newLines[currentLineIdx] === undefined) {
                            newLines[currentLineIdx] = "";
                        }
                        newLines[currentLineIdx] = currentLine.substring(0, currentCharIdx + 1);
                        setDisplayedLines([...newLines]);
                        currentCharIdx++;
                    } else {
                        currentLineIdx++;
                        currentCharIdx = 0;
                    }
                } else {
                    setIsDone(true);
                    clearInterval(typingInterval);
                }
            }, 30);
        };

        timeoutId = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(typingInterval);
        };
    }, [lines, delay]);

    return (
        <div className="font-mono text-emerald-300 text-left inline-block">
            {displayedLines.map((line, i) => (
                <div key={i} className="mb-1">
                    {`> `}{line}
                    {i === displayedLines.length - 1 && !isDone && (
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-5 bg-emerald-300 ml-1 align-middle"
                        />
                    )}
                </div>
            ))}
            {isDone && (
                <div>
                    {`> `}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-5 bg-emerald-300 ml-1 align-middle"
                    />
                </div>
            )}
        </div>
    );
};

export default function Hero() {
    const router = useRouter();
    const [tapCount, setTapCount] = useState(0);
    const tapTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleNameTap = () => {
        setTapCount((prev) => {
            const newCount = prev + 1;
            if (newCount === 3) {
                // Trigger Triple Tap Easter Egg
                document.body.classList.add("bg-glitch", "active"); // Use global glitch if possible, or just navigate
                setTimeout(() => {
                    document.body.classList.remove("bg-glitch", "active");
                    router.push("/about");
                }, 500);
                return 0;
            }
            
            // Reset tap count if not tapped again within 500ms
            if (tapTimeout.current) clearTimeout(tapTimeout.current);
            tapTimeout.current = setTimeout(() => {
                setTapCount(0);
            }, 600);
            
            return newCount;
        });
    };

    return (
        <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <h1 
                    onClick={handleNameTap}
                    className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-lg glitch-text mb-6 cursor-pointer select-none" 
                    data-text="Bhavishya Tyagi"
                    title="Tap me 3 times"
                >
                    Bhavishya Tyagi
                </h1>
                
                <div className="text-lg md:text-xl text-gray-300 mt-6 font-light tracking-wide min-h-[100px] flex justify-center">
                    <Typewriter 
                        lines={[
                            "executing role_loading.sh...", 
                            "[OK] Core initialized.",
                            "[OK] Skills loaded: Cybersecurity Professional",
                            "[OK] Modules active: Malware Analysis | Pentesting"
                        ]} 
                        delay={500} 
                    />
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <a href="#skills" className="px-6 py-3 bg-emerald-500/10 border border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all font-mono">
                        [ VIEW_ARSENAL ]
                    </a>
                    <a href="#contact" className="px-6 py-3 border border-white/20 text-white hover:bg-white/5 transition-all font-mono">
                        [ INITIATE_CONTACT ]
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
