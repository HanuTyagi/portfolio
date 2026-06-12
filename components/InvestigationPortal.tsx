"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CyberBackground from "@/components/CyberBackground";
import IdleProtocol from "@/components/IdleProtocol";
import Scanner from "@/components/Scanner";
import SearchFilter from "@/components/SearchFilter";
import LiveThreatAssessment from "@/components/LiveThreatAssessment";
import CaseFile from "@/components/CaseFile";
import ForensicTimeline from "@/components/ForensicTimeline";
import ArsenalInventory from "@/components/ArsenalInventory";
import ClassifiedBriefing from "@/components/ClassifiedBriefing";
import PenTestMode from "@/components/PenTestMode";
import EasterEggRegistry from "@/components/EasterEggRegistry";
import InvestigationStatusBar from "@/components/InvestigationStatusBar";
import { CASE_FILES, InvestigationFilter } from "@/constants/investigation";
import { InvestigationProvider, useInvestigation } from "@/context/InvestigationContext";

function Hero() {
  const { increaseThreat, unlockAdminMode, isAdminMode, glitching, glitchMessage, threatLevel } = useInvestigation();

  return (
    <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 pb-24 pt-24 text-center">
      <motion.button
        type="button"
        aria-label="Hidden system administrator mode pixel"
        onClick={unlockAdminMode}
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 0.8] }}
        transition={{ repeat: Infinity, duration: 2, repeatDelay: 6 }}
        className="absolute right-[12%] top-[22%] h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_18px_rgba(255,0,110,0.9)]"
        title="glitching pixel"
      />
      <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-6xl">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.45em] text-cyan-300">Bhavishya Tyagi</p>
        <h1 className="glitch-text text-5xl font-black tracking-tighter text-white md:text-8xl" data-text="THREAT INTELLIGENCE ANALYST">
          THREAT INTELLIGENCE ANALYST
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 md:text-xl">
          Portfolio reclassified as an analyst dashboard: active cases, forensic evidence, classified arsenal, and hidden backdoors for curious ethical hackers.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#cases" onMouseEnter={() => increaseThreat(5, "hero cases hover")} className="rounded-full border border-pink-400/60 bg-pink-500/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-pink-100 transition hover:scale-105 hover:shadow-[0_0_28px_rgba(255,0,110,0.28)]">[ Open Case Files ]</a>
          <a href="#briefing" className="rounded-full border border-cyan-400/50 px-6 py-3 font-mono text-sm uppercase tracking-widest text-cyan-100 transition hover:scale-105 hover:bg-cyan-400/10">[ Decrypt Briefing ]</a>
        </div>
        <LiveThreatAssessment />
        {threatLevel >= 100 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto mt-6 max-w-3xl rounded-2xl border border-red-400/50 bg-red-500/15 p-5 font-mono text-red-100">
            YOU FOUND THE MASTER BACKDOOR — message from Bhavishya: thanks for testing ethically. Real security is curiosity plus restraint.
          </motion.div>
        )}
        {isAdminMode && (
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-purple-400/40 bg-purple-500/10 p-5 font-mono text-purple-100">
            SYSTEM ADMINISTRATOR MODE: You shouldn't be here, but since you are — render path stable, 3 active cases, 10 secrets indexed, performance budget guarded.
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {glitching && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-red-950/20 font-mono text-2xl font-black text-red-100 backdrop-hue-rotate-180 md:text-5xl">
            {glitchMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Cases() {
  return (
    <section id="cases" className="relative z-20 px-4 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-pink-300">Active Cases</p>
        <h2 className="mb-10 text-4xl font-black tracking-tight text-white md:text-6xl">Investigation case files</h2>
        <div className="grid gap-6">
          {CASE_FILES.map((file) => <CaseFile key={file.id} file={file} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { isPenTestMode, triggerGlitch, increaseThreat } = useInvestigation();
  return (
    <section id="contact" className="relative z-20 px-4 py-20 md:px-12">
      <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/20 bg-black/45 p-6 text-center backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300">Secure Contact Node</p>
        <h2 className="mt-2 text-3xl font-black text-white">Open collaboration channel</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">Open to cybersecurity research, penetration testing, and security engineering collaborations.</p>
        {isPenTestMode && <p className="mt-4 rounded-xl border border-pink-400/30 bg-pink-500/10 p-3 font-mono text-sm text-pink-100">SOCIAL ENGINEERING RESPONSE: nice try — direct, transparent communication still works best.</p>}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          {[
            ["Email", "mailto:hanutyagi9@gmail.com"],
            ["Phone", "tel:+917983475910"],
            ["GitHub", "https://github.com/HanuTyagi"],
            ["TryHackMe", "https://tryhackme.com/p/BhavishyaTyagi"],
            ["LinkedIn", "https://www.linkedin.com/in/Bhavishya-Hanu/"],
          ].map(([label, href]) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" onMouseEnter={() => { increaseThreat(4, `contact ${label}`); if (label === "Email") triggerGlitch("CONTACT NODE // SENSITIVE DATA REVEALED"); }} className="rounded-full border border-white/10 px-4 py-2 font-mono text-cyan-100 transition hover:border-pink-400/50 hover:bg-pink-500/10">
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalBody() {
  const [filter, setFilter] = useState<InvestigationFilter>("all");
  const show = (section: InvestigationFilter) => filter === "all" || filter === section;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050713] pb-16 text-white">
      <CyberBackground />
      <IdleProtocol />
      <Hero />
      <SearchFilter active={filter} onChange={setFilter} />
      {show("projects") && <Cases />}
      {show("tools") && <ArsenalInventory />}
      {show("experience") && <ForensicTimeline />}
      {show("certifications") && <ForensicTimeline onlyCertifications />}
      {filter === "all" && <ClassifiedBriefing />}
      <Contact />
      <footer className="relative z-50 border-t border-cyan-500/10 bg-black/60 px-4 py-8 text-center text-sm text-gray-500 backdrop-blur-sm">
        <div>© {new Date().getFullYear()} Bhavishya Tyagi. Investigation Portal active.</div>
        <Scanner />
      </footer>
      <PenTestMode />
      <EasterEggRegistry />
      <InvestigationStatusBar />
    </main>
  );
}

export default function InvestigationPortal() {
  return (
    <InvestigationProvider>
      <PortalBody />
    </InvestigationProvider>
  );
}
