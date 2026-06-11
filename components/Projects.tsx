"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/constants/portfolio";
import { useThrottledInView } from "@/hooks/useThrottledInView";

export default function Projects() {
  const { ref, isInView } = useThrottledInView();

  return (
    <section id="projects" ref={ref} className="relative z-20 py-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="heading-font text-4xl md:text-6xl font-bold mb-12 tracking-tighter text-white"
        >
          Open Source Security Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="interactive-card group rounded-2xl h-full p-6 flex flex-col"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium tracking-widest text-black uppercase bg-[var(--color-secondary)] rounded-full shadow-lg">
                  {project.category}
                </span>
                <span className="px-3 py-1 text-xs font-medium tracking-widest text-white uppercase border border-white/30 rounded-full">
                  {project.tech}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-3 heading-font">{project.title}</h3>
              <p className="text-slate-200 leading-relaxed mb-6">{project.description}</p>
              <a href={project.link} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center text-sm font-semibold animated-link">
                View Repository →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
