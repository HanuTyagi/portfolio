"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

function StatCard({ stat, index }: { stat: any, index: number }) {
    const router = useRouter();
    const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => {
        if (stat.title === "TryHackMe Rank") {
            const timer = setTimeout(() => {
                setIsFlipped(true);
            }, 2000); // 2 seconds
            setHoverTimer(timer);
        }
    };

    const handleMouseLeave = () => {
        if (hoverTimer) clearTimeout(hoverTimer);
        setIsFlipped(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (isFlipped) {
            e.preventDefault();
            router.push("/certifications");
        }
    };

    return (
        <motion.a
            href={isFlipped ? "/certifications" : stat.link}
            target={isFlipped ? "_self" : "_blank"}
            rel={isFlipped ? "" : "noopener noreferrer"}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
            onClick={handleClick}
            style={{ perspective: "1000px" }}
            className="block p-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all group relative h-36"
        >
            <AnimatePresence mode="wait">
                {isFlipped ? (
                    <motion.div 
                        key="back"
                        initial={{ rotateX: -90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-900/90 backdrop-blur-md border border-emerald-400 rounded-lg"
                    >
                        <span className="text-xl font-bold text-white mb-2">Certifications Found</span>
                        <span className="text-sm font-mono text-emerald-300 border border-emerald-400/50 px-2 py-1 rounded">View Details</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="front"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <span className="text-gray-400 font-mono text-sm uppercase tracking-wider">{stat.title}</span>
                            <span className="text-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </span>
                        </div>
                        <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-emerald-400/80 text-sm font-mono">{`> ${stat.description}`}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.a>
    );
}

export default function Stats() {
    const stats = [
        {
            title: "GitHub Repositories",
            value: "11",
            icon: "github",
            description: "Open Source Projects",
            link: "https://github.com/HanuTyagi"
        },
        {
            title: "TryHackMe Rank",
            value: "Top 8%",
            icon: "terminal",
            description: "Active CTF Player",
            link: "https://tryhackme.com/p/BhavishyaTyagi"
        },
        {
            title: "TryHackMe Rooms",
            value: "78",
            icon: "server",
            description: "Completed Modules",
            link: "https://tryhackme.com/p/BhavishyaTyagi"
        }
    ];

    return (
        <section className="relative z-10 py-16 px-4 md:px-12 bg-black/40 border-y border-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-emerald-500/50"></div>
                    <h2 className="text-2xl md:text-3xl font-mono text-emerald-400 font-bold uppercase tracking-widest">
                        Profile Stats
                    </h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-emerald-500/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
