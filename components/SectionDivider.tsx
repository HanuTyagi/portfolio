"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  flip?: boolean;
}

export default function SectionDivider({ flip = false }: SectionDividerProps) {
  return (
    <div className="relative z-20 pointer-events-none overflow-hidden leading-none" aria-hidden>
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`w-full h-12 md:h-16 ${flip ? "rotate-180" : ""}`}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(131,56,236,0.2)" />
            <stop offset="50%" stopColor="rgba(0,217,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,0,110,0.2)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,64 C120,20 240,20 360,64 C480,108 600,108 720,64 C840,20 960,20 1080,64 C1200,108 1320,108 1440,64 L1440,120 L0,120 Z"
          fill="url(#divider-gradient)"
          animate={{
            d: [
              "M0,64 C120,20 240,20 360,64 C480,108 600,108 720,64 C840,20 960,20 1080,64 C1200,108 1320,108 1440,64 L1440,120 L0,120 Z",
              "M0,72 C120,112 240,112 360,72 C480,32 600,32 720,72 C840,112 960,112 1080,72 C1200,32 1320,32 1440,72 L1440,120 L0,120 Z",
              "M0,64 C120,20 240,20 360,64 C480,108 600,108 720,64 C840,20 960,20 1080,64 C1200,108 1320,108 1440,64 L1440,120 L0,120 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}
