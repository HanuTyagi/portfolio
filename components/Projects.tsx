"use client";

import { motion } from "framer-motion";

const projects = [
    {
        title: "Malware Scanner",
        category: "Static Malware Detection",
        description: "9-module Python scanner with hash lookup, YARA, PE behavior analysis, entropy checks, fuzzy matching, archive scanning, phishing detection, VirusTotal enrichment, and SQLite cache.",
        tech: "Python, YARA, CustomTkinter, SQLite",
        link: "https://github.com/HanuTyagi/Malware-Scanner"
    },
    {
        title: "FUDMal",
        category: "Adversary Emulation Lab",
        description: "Windows-focused red/blue team training toolkit with 9 MITRE ATT&CK-mapped simulation tabs and optional auto-cleanup for safe lab usage.",
        tech: "Python, Tkinter, PyInstaller, MITRE ATT&CK",
        link: "https://github.com/HanuTyagi/FUDMal"
    },
    {
        title: "RedScan",
        category: "Network Intelligence Platform",
        description: "Unified GUI + backend scanner with 80+ profiles, visual command factory, async parser, conflict manager, adaptive PID+AIMD rate control, and optional API auth.",
        tech: "Python, FastAPI, Nmap, OpenAI/Gemini",
        link: "https://github.com/HanuTyagi/RedScan"
    },
];

export default function Projects() {
    return (
        <section id="projects" className="relative z-20 bg-[#05090f] py-24 px-4 md:px-12 border-t border-emerald-300/10">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter text-white"
                >
                    Open Source Security Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-emerald-300/40 h-full p-6 flex flex-col"
                        >
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 text-xs font-medium tracking-widest text-black uppercase bg-emerald-300 rounded-full shadow-lg">
                                    {project.category}
                                </span>
                                <span className="px-3 py-1 text-xs font-medium tracking-widest text-white uppercase border border-white/30 rounded-full">
                                    {project.tech}
                                </span>
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
                            <p className="text-gray-200 leading-relaxed mb-6">{project.description}</p>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-auto inline-flex items-center text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
                            >
                                View Repository →
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
