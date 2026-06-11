"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { PROFILE_STATS } from "@/constants/portfolio";
import type { PortfolioStat } from "@/types/portfolio";
import { useThrottledInView } from "@/hooks/useThrottledInView";

function StatCard({ stat, index, isInView }: { stat: PortfolioStat; index: number; isInView: boolean }) {
  const router = useRouter();
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (stat.title === "TryHackMe Rank") {
      clearHoverTimer();
      hoverTimerRef.current = setTimeout(() => {
        setIsFlipped(true);
      }, 2000);
    }
  };

  const handleMouseLeave = () => {
    clearHoverTimer();
    setIsFlipped(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isFlipped) {
      e.preventDefault();
      router.push("/certifications");
    }
  };

  useEffect(() => () => clearHoverTimer(), []);

  return (
    <motion.a
      href={isFlipped ? "/certifications" : stat.link}
      target={isFlipped ? "_self" : "_blank"}
      rel={isFlipped ? undefined : "noopener noreferrer"}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ delay: index * 0.12, duration: 0.45 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: "1000px" }}
      className="interactive-card block p-6 relative h-36"
    >
      <AnimatePresence mode="wait">
        {isFlipped ? (
          <motion.div
            key="back"
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(131,56,236,0.85)] backdrop-blur-md border border-[rgba(0,217,255,0.6)] rounded-xl"
          >
            <span className="text-xl font-bold text-white mb-2 heading-font">Certifications Found</span>
            <span className="text-sm font-mono text-[var(--color-secondary)] border border-[rgba(0,217,255,0.5)] px-2 py-1 rounded">
              View Details
            </span>
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
              <span className="text-slate-400 font-mono text-sm uppercase tracking-wider">{stat.title}</span>
              <span className="text-[var(--color-primary)]/60 group-hover:text-[var(--color-secondary)] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </span>
            </div>
            <div className="text-4xl font-bold text-white mb-2 heading-font">{stat.value}</div>
            <div className="text-[var(--color-secondary)]/85 text-sm font-mono">{`> ${stat.description}`}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

export default function Stats() {
  const { ref, isInView } = useThrottledInView();

  return (
    <section ref={ref} className="relative z-10 py-16 px-4 md:px-12 bg-black/35 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[var(--color-primary)]/60"></div>
          <h2 className="heading-font text-2xl md:text-3xl text-[var(--color-secondary)] font-bold uppercase tracking-widest">
            Profile Stats
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[var(--color-accent)]/60"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILE_STATS.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
