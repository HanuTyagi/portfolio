"use client";

import { motion } from "framer-motion";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from "@/constants/portfolio";
import { useThrottledInView } from "@/hooks/useThrottledInView";

export default function Experience() {
  const { ref, isInView } = useThrottledInView();

  return (
    <section ref={ref} className="relative z-20 py-24 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="heading-font text-4xl md:text-6xl font-bold mb-12 tracking-tighter text-white text-center"
        >
          Experience & Credentials
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {EDUCATION.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="interactive-card rounded-xl p-5"
            >
              <div className="text-sm text-slate-400 mb-1">{item.period}</div>
              <h3 className="text-lg text-white font-semibold heading-font">{item.degree}</h3>
              <p className="text-sm text-slate-300">
                {item.institute} · {item.score}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="relative border-l border-[var(--color-secondary)]/30 ml-4 md:ml-0 space-y-10">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.period}`}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full shadow-[0_0_12px_rgba(255,0,110,0.85)]" />

              <div className="text-sm text-slate-500 font-mono mb-2 uppercase tracking-widest">{exp.period}</div>
              <h3 className="text-2xl font-bold text-white mb-1 heading-font">{exp.company}</h3>
              <h4 className="text-lg text-slate-300 mb-3">{exp.role}</h4>
              <p className="text-slate-200 leading-relaxed max-w-2xl">{exp.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-black/35 p-6">
          <h3 className="text-2xl font-semibold text-white mb-4 heading-font">Key Certifications</h3>
          <ul className="space-y-2 text-slate-200">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert} className="flex gap-2">
                <span className="text-[var(--color-secondary)]">▸</span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
