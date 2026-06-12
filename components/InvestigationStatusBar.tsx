"use client";

import { useEffect, useState } from "react";
import { EASTER_EGGS } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function InvestigationStatusBar() {
  const { threatLevel, activeInvestigations, glitching, unlockedEggs } = useInvestigation();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] border-t border-cyan-400/20 bg-[#050713]/90 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-slate-300 backdrop-blur md:text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
        <span>Threat Level {threatLevel}%</span>
        <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10 md:w-48"><div className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all" style={{ width: `${threatLevel}%` }} /></div>
        <span>Investigations: {activeInvestigations}</span>
        <span className={glitching ? "text-red-300" : "text-cyan-300"}>Glitch: {glitching ? "ACTIVE" : "STABLE"}</span>
        <span>Time Sync: {time}</span>
        {unlockedEggs.length > 0 && <span className="text-pink-300">Found {unlockedEggs.length}/{EASTER_EGGS.length} secrets</span>}
      </div>
    </div>
  );
}
