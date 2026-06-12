"use client";

import { motion } from "framer-motion";
import { CYBER_STATS, SKILL_GROUPS } from "@/constants/portfolio";
import { useThrottledInView } from "@/hooks/useThrottledInView";

export default function Skills() {
  const { ref, isInView } = useThrottledInView();

  return (
    <section id="skills" ref={ref} className="relative z-20 py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="heading-font text-4xl md:text-6xl font-bold mb-10 tracking-tight text-white"
        >
          Cyber Arsenal
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="interactive-card rounded-2xl p-6"
            >
              <h3 className="heading-font text-xl font-semibold text-[var(--color-secondary)] mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-100 transition-colors hover:border-[var(--color-accent)]/50 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--color-accent)]/30 bg-black/35 p-6">
          <p className="text-[var(--color-primary)] font-mono text-sm mb-4">root@portfolio:~# threat-surface --snapshot</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CYBER_STATS.map((stat) => (
              <div key={stat.label} className="interactive-card rounded-xl p-4">
                <div className="text-2xl font-bold text-white heading-font">{stat.value}</div>
                <div className="text-xs text-slate-300 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
