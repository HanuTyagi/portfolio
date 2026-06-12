"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ARSENAL } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function ArsenalInventory() {
  const [open, setOpen] = useState(ARSENAL[0].title);
  const { increaseThreat, isPenTestMode } = useInvestigation();

  return (
    <section id="skills" className="relative z-20 px-4 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300">[ARSENAL INVENTORY]</p>
        <h2 className="mb-10 text-4xl font-black tracking-tight text-white md:text-6xl">Classified Arsenal</h2>
        <div className="grid gap-5 lg:grid-cols-3">
          {ARSENAL.map((category, index) => {
            const expanded = open === category.title;
            return (
              <motion.div key={category.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-[#080b18]/80 p-5 backdrop-blur">
                <button type="button" onClick={() => { setOpen(expanded ? "" : category.title); increaseThreat(5, category.title); }} className="flex w-full items-center justify-between text-left">
                  <span>
                    <span className="font-mono text-xs uppercase tracking-widest text-pink-300">├─ {category.codename}</span>
                    <span className="block text-2xl font-black text-white">{category.title}</span>
                  </span>
                  <span className="text-2xl text-cyan-200">{expanded ? "−" : "+"}</span>
                </button>
                <p className="mt-3 text-sm text-slate-300">{category.description}</p>
                <AnimatePresence>
                  {expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-5 space-y-4">
                        {category.items.map((item) => (
                          <div key={item.name} className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4" data-vulnerability="skill-card">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="font-bold text-white">{item.name}</h3>
                              <span className="font-mono text-xs text-cyan-200">{item.proficiency}%</span>
                            </div>
                            <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                              <motion.div className="h-full bg-gradient-to-r from-pink-500 to-cyan-300" initial={{ width: 0 }} whileInView={{ width: `${item.proficiency}%` }} viewport={{ once: true }} />
                            </div>
                            {isPenTestMode && <p className="mt-3 rounded-xl border border-pink-400/25 bg-pink-500/10 p-3 font-mono text-xs text-pink-100">BRUTE FORCE DETAIL: {item.advancedDetail}</p>}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
