"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "C", "C++", "HTML", "PHP", "SQL", "YARA", "Bash"],
  },
  {
    title: "Security Expertise",
    items: [
      "Digital Forensics",
      "Malware Analysis",
      "Ethical Hacking",
      "Penetration Testing",
      "Vulnerability Analysis",
      "OSINT",
      "MITRE ATT&CK",
      "Network Security",
      "Network Reconnaissance",
      "OWASP Top 10",
      "Web LLM Attacks",
      "SQL Injection",
      "XSS",
      "CSRF",
      "Prompt Engineering",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Metasploit",
      "Wireshark",
      "Nmap",
      "tcpdump",
      "OpenVAS",
      "Nessus",
      "Git/GitHub",
      "Splunk",
      "Burp Suite",
      "Suricata",
      "Nikto",
      "Hydra",
      "John The Ripper",
      "Bettercap",
      "BeEF",
      "GoBuster",
      "Fuff",
      "Curl",
      "Mimikatz",
    ],
  },
];

const cyberStats = [
  { label: "Core Projects", value: "3" },
  { label: "Scanning Profiles Built", value: "80+" },
  { label: "Malware Hash Coverage", value: "96.8K+" },
  { label: "MITRE-Mapped Sim Tabs", value: "9" },
];

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 bg-[#070d12] py-24 px-4 md:px-12 border-t border-emerald-300/10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold mb-10 tracking-tight text-white"
        >
          Cyber Arsenal
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-[#0b1018]/80 backdrop-blur p-6"
            >
              <h3 className="text-xl font-semibold text-emerald-300 mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-black/40 p-6">
          <p className="text-emerald-300 font-mono text-sm mb-4">
            root@portfolio:~# threat-surface --snapshot
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cyberStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-300 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
