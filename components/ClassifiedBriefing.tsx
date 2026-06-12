"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BRIEFING_CHALLENGES } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

export default function ClassifiedBriefing() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const { increaseThreat, triggerGlitch, unlockEgg, unlockedEggs } = useInvestigation();

  return (
    <section id="briefing" className="relative z-20 px-4 py-20 md:px-12">
      <div className="mx-auto max-w-5xl rounded-3xl border border-pink-400/20 bg-black/45 p-6 backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-pink-300">Classified Briefing</p>
        <h2 className="mt-2 text-4xl font-black text-white md:text-6xl">Encrypted analyst narrative</h2>
        <p className="mt-4 font-mono text-sm text-cyan-100">Initial payload: 01000010 01101000 01100001 01110110 01101001 01110011 01101000 01111001 01100001 // click challenges to decrypt.</p>

        <div className="mt-8 space-y-5">
          {BRIEFING_CHALLENGES.map((challenge) => (
            <motion.div key={challenge.id} layout className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-mono text-lg text-cyan-200">{challenge.prompt}</h3>
                  <p className="text-sm text-slate-400">Hint: {challenge.hint}</p>
                </div>
                <div className="flex gap-2">
                  <input
                    value={answers[challenge.id] ?? ""}
                    onChange={(event) => setAnswers((current) => ({ ...current, [challenge.id]: event.target.value }))}
                    className="rounded-full border border-white/10 bg-black/50 px-4 py-2 font-mono text-sm text-white outline-none focus:border-cyan-300"
                    placeholder="passphrase"
                    aria-label={`Passphrase for ${challenge.prompt}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const correct = (answers[challenge.id] ?? "").trim().toLowerCase().includes(challenge.answer);
                      if (correct) {
                        setRevealed((current) => ({ ...current, [challenge.id]: true }));
                        increaseThreat(30, `briefing ${challenge.id}`);
                        unlockEgg("console_decrypt");
                        triggerGlitch("DECRYPTION COMPLETE");
                      } else {
                        triggerGlitch("BAD PASSPHRASE // TRY HINT");
                      }
                    }}
                    className="rounded-full border border-pink-400/50 px-4 py-2 font-mono text-xs uppercase text-pink-100 transition hover:bg-pink-500/10"
                  >
                    Decrypt
                  </button>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-cyan-300/15 bg-black/35 p-4 font-mono text-sm text-cyan-100">
                {revealed[challenge.id] || unlockedEggs.includes("konami_briefing") ? challenge.revealed : "█▓▒░ ENCRYPTED_BRIEFING_BLOCK // ACCESS REQUIRES PASSKEY ░▒▓█"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
