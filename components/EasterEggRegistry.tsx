"use client";

import { EASTER_EGGS } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function EasterEggRegistry() {
  const { unlockedEggs } = useInvestigation();
  if (unlockedEggs.length === 0) return null;

  return (
    <div className="fixed right-4 top-24 z-[60] hidden max-w-xs rounded-2xl border border-purple-400/30 bg-black/70 p-4 font-mono text-xs text-purple-100 backdrop-blur md:block">
      <p className="mb-2 text-pink-300">Easter Egg Registry</p>
      <p>Found {unlockedEggs.length}/{EASTER_EGGS.length} secrets</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {unlockedEggs.map((egg) => <span key={egg} className="rounded-full bg-purple-500/20 px-2 py-1">{egg}</span>)}
      </div>
    </div>
  );
}
