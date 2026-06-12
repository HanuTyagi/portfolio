"use client";

import { motion } from "framer-motion";
import { THREAT_STATS } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function LiveThreatAssessment() {
  const { threatLevel, increaseThreat, triggerGlitch } = useInvestigation();
  const status = threatLevel >= 100 ? "SYSTEM_BREACH" : threatLevel >= 70 ? "CRITICAL" : threatLevel >= 35 ? "ELEVATED" : "SAFE";

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-cyan-300/20 bg-black/45 p-5 shadow-[0_0_50px_rgba(131,56,236,0.16)] backdrop-blur"
      onMouseEnter={() => increaseThreat(5, "threat card hover")}
    >
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300">Live Threat Assessment</p>
          <h3 className="text-2xl font-black text-white">Expertise signature: {status}</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            increaseThreat(10, "manual assessment refresh");
            triggerGlitch("ASSESSMENT REFRESHED // SIGNAL SPIKE");
          }}
          className="rounded-full border border-pink-400/60 bg-pink-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-pink-100 transition hover:scale-105 hover:bg-pink-500/20"
        >
          [ Refresh Signal ]
        </button>
      </div>
      <div className="mb-5 h-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-red-500"
          animate={{ width: `${threatLevel}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        {THREAT_STATS.map((stat, index) => (
          <motion.button
            type="button"
            key={stat.label}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => increaseThreat(index === 3 ? 10 : 5, stat.label)}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{stat.label}</div>
            <motion.div className="mt-2 text-3xl font-black text-white" animate={{ opacity: [0.75, 1, 0.75] }} transition={{ repeat: Infinity, duration: 2 + index * 0.2 }}>
              {stat.value}
            </motion.div>
            <div className="mt-2 font-mono text-xs text-cyan-200 opacity-0 transition group-hover:opacity-100">{stat.pulse}</div>
          </motion.button>
        ))}
      </div>
    </motion.aside>
  );
}
