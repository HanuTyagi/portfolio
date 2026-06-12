"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TIMELINE_EVENTS } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function ForensicTimeline({ onlyCertifications = false }: { onlyCertifications?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const { increaseThreat, triggerGlitch, unlockEgg } = useInvestigation();
  const events = onlyCertifications ? TIMELINE_EVENTS.filter((event) => event.type === "certification") : TIMELINE_EVENTS;

  return (
    <section id="experience" className="relative z-20 px-4 py-20 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-pink-300">Forensic Timeline</p>
        <h2 className="mb-10 text-4xl font-black tracking-tight text-white md:text-6xl">Evidence-backed progression</h2>
        <div className="relative border-l border-cyan-400/25 pl-6">
          {events.map((event, index) => (
            <motion.div
              key={`${event.year}-${event.title}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-300/50"
              data-sensitive={event.type === "certification" ? "true" : undefined}
              onMouseEnter={() => event.type === "certification" && triggerGlitch("CERT ARTIFACT HASH DECRYPTING...")}
            >
              <div className="absolute -left-[31px] top-7 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,217,255,0.9)]" />
              <button
                type="button"
                className="w-full text-left"
                onClick={() => {
                  setOpen(open === event.title ? null : event.title);
                  increaseThreat(8, event.title);
                  triggerGlitch(`TIMELINE NODE OPENED: ${event.year}`);
                  if (event.type === "certification") unlockEgg("glitch_decode");
                }}
              >
                <div className="font-mono text-lg text-cyan-200">{event.year} ► {event.title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-pink-400/40 px-3 py-1 text-xs text-pink-100">[{event.badge}]</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">[Details Toggle]</span>
                  <span className="rounded-full border border-purple-400/40 px-3 py-1 text-xs text-purple-100">[Glitch on Click]</span>
                </div>
              </button>
              <AnimatePresence>
                {open === event.title && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="mt-4 text-slate-200">{event.details}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {event.milestones.map((milestone) => <span key={milestone} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">{milestone}</span>)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
