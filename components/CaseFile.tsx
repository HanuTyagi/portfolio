"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaseFile as CaseFileType } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function CaseFile({ file }: { file: CaseFileType }) {
  const [open, setOpen] = useState(false);
  const { increaseThreat, isPenTestMode, unlockPenTestMode, triggerGlitch } = useInvestigation();
  const statusColor = file.statusTone === "active" ? "text-red-300 border-red-400/50" : file.statusTone === "closed" ? "text-cyan-200 border-cyan-400/40" : "text-purple-200 border-purple-400/40";

  return (
    <motion.article
      layout
      onMouseEnter={() => increaseThreat(5, `hover case ${file.id}`)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#080b18]/85 p-5 backdrop-blur transition hover:border-pink-400/40 hover:shadow-[0_0_40px_rgba(255,0,110,0.16)]"
      data-vulnerability="case-file"
    >
      <div className="absolute right-4 top-4 hidden rounded-xl border border-cyan-400/40 bg-black/90 p-3 font-mono text-xs text-cyan-100 opacity-0 shadow-2xl transition group-hover:block group-hover:opacity-100">
        <p className="mb-1 text-pink-300">Code Snippet</p>
        <pre>{file.codeSnippet}</pre>
      </div>
      <button
        type="button"
        onClick={() => {
          setOpen((value) => !value);
          increaseThreat(10, `open case ${file.id}`);
          if (file.id === "002") unlockPenTestMode("FUDMal case file");
        }}
        className="w-full text-left"
      >
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest">
          <span className="rounded-full bg-pink-500/20 px-3 py-1 text-pink-100">[CASE #{file.id}]</span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">[Classification] {file.classification}</span>
          <span className={`rounded-full border px-3 py-1 ${statusColor}`}>[Status] {file.status}</span>
        </div>
        <h3 className="text-3xl font-black tracking-tight text-white">{file.title}</h3>
        <p className="mt-3 max-w-3xl text-slate-300">{file.summary}</p>
      </button>

      <div className="mt-5 border-l border-cyan-400/30 pl-4 font-mono text-sm text-cyan-100">
        {file.evidence.map((evidence) => <div key={evidence}>│ {evidence}</div>)}
        <div>└─ [View Code] [Case Report] [Code Snippet on Hover]</div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-5 grid gap-4 rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-4 md:grid-cols-[1fr_auto]">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">Case Report</p>
                <p className="mt-2 text-slate-200">{file.architecture}</p>
                {isPenTestMode && (
                  <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 overflow-x-auto rounded-xl border border-pink-400/30 bg-black/70 p-3 text-xs text-pink-100">
                    {`// Pen Test Mode: internal architecture exposed\n${file.codeSnippet}\n// operator note: validate, document, patch`}
                  </motion.pre>
                )}
              </div>
              <div className="flex flex-wrap items-start gap-2">
                {file.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="rounded-full border border-cyan-300/50 px-4 py-2 font-mono text-xs uppercase text-cyan-100 transition hover:scale-105 hover:bg-cyan-400/10">
                    {link.label}
                  </a>
                ))}
                <button type="button" onClick={() => triggerGlitch("HIDDEN DETAIL: evidence chain verified")} className="rounded-full border border-pink-300/50 px-4 py-2 font-mono text-xs uppercase text-pink-100 transition hover:scale-105 hover:bg-pink-400/10">
                  Case Report
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
