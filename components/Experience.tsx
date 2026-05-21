"use client";

import { motion } from "framer-motion";

const education = [
    {
        degree: "M.Tech in Computer Science",
        period: "2024 – 2026",
        institute: "UPES",
        score: "CGPA: 8.66",
    },
    {
        degree: "B.Tech in Computer Science",
        period: "2020 – 2024",
        institute: "GEHU",
        score: "CGPA: 8.02",
    },
];

const experiences = [
    {
        company: "Deltaware Solution Private Limited",
        role: "Penetration Tester Intern",
        period: "May 2025 – June 2025",
        description: "Executed WiFi attack simulations to identify vulnerabilities and built aircrack-ng automation scripts for reconnaissance and exploitation workflows.",
    },
    {
        company: "Tata Cybersecurity Security Analyst Job Simulation",
        role: "Cybersecurity Analyst (Simulation)",
        period: "July 2025",
        description: "Applied IAM principles and security best practices, and delivered technical documentation and stakeholder presentations.",
    },
    {
        company: "Deloitte Australia Cyber Job Simulation",
        role: "Security Operations (Simulation)",
        period: "June 2025",
        description: "Performed suspicious activity triage and incident scoping on web activity logs during a simulated breach.",
    },
];

const certifications = [
    "Certified Ethical Hacker (CEH) v12 — EC-Council",
    "Google Cybersecurity Professional — Google",
    "CC Certified in Cybersecurity — ISC2",
    "Cisco Certified Network Associate (CCNA) v7 — Cisco",
];

export default function Experience() {
    return (
        <section className="relative z-20 bg-[#060b11] py-24 px-4 md:px-12 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter text-white text-center"
                >
                    Experience & Credentials
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {education.map((item, index) => (
                        <motion.div
                            key={item.degree}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            viewport={{ once: true }}
                            className="rounded-xl border border-white/10 bg-white/5 p-5"
                        >
                            <div className="text-sm text-gray-400 mb-1">{item.period}</div>
                            <h3 className="text-lg text-white font-semibold">{item.degree}</h3>
                            <p className="text-sm text-slate-300">{item.institute} · {item.score}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="relative border-l border-white/20 ml-4 md:ml-0 space-y-10">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-12"
                        >
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-emerald-300 rounded-full shadow-[0_0_10px_rgba(110,231,183,0.8)]" />

                            <div className="text-sm text-gray-500 font-mono mb-2 uppercase tracking-widest">{exp.period}</div>
                            <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                            <h4 className="text-lg text-gray-400 mb-3">{exp.role}</h4>
                            <p className="text-gray-300 leading-relaxed max-w-2xl">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 rounded-2xl border border-white/10 bg-black/30 p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Key Certifications</h3>
                    <ul className="space-y-2 text-slate-200">
                        {certifications.map((cert) => (
                            <li key={cert} className="flex gap-2">
                                <span className="text-emerald-300">▸</span>
                                <span>{cert}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
