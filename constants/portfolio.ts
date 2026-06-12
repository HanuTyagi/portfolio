import type {
  CyberStat,
  EducationItem,
  ExperienceItem,
  PortfolioStat,
  ProjectItem,
  SkillGroup,
} from "@/types/portfolio";

export const HERO_LINES = [
  "executing role_loading.sh...",
  "[OK] Core initialized.",
  "[OK] Skills loaded: Cybersecurity Professional",
  "[OK] Modules active: Malware Analysis | Pentesting",
] as const;

export const PROFILE_STATS: PortfolioStat[] = [
  {
    title: "GitHub Repositories",
    value: "11",
    icon: "github",
    description: "Open Source Projects",
    link: "https://github.com/HanuTyagi",
  },
  {
    title: "TryHackMe Rank",
    value: "Top 8%",
    icon: "terminal",
    description: "Active CTF Player",
    link: "https://tryhackme.com/p/BhavishyaTyagi",
  },
  {
    title: "TryHackMe Rooms",
    value: "78",
    icon: "server",
    description: "Completed Modules",
    link: "https://tryhackme.com/p/BhavishyaTyagi",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
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

export const CYBER_STATS: CyberStat[] = [
  { label: "Core Projects", value: "3" },
  { label: "Scanning Profiles Built", value: "80+" },
  { label: "Malware Hash Coverage", value: "96.8K+" },
  { label: "MITRE-Mapped Sim Tabs", value: "9" },
];

export const EDUCATION: EducationItem[] = [
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

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Deltaware Solution Private Limited",
    role: "Penetration Tester Intern",
    period: "May 2025 – June 2025",
    description:
      "Executed WiFi attack simulations to identify vulnerabilities and built aircrack-ng automation scripts for reconnaissance and exploitation workflows.",
  },
  {
    company: "Tata Cybersecurity Security Analyst Job Simulation",
    role: "Cybersecurity Analyst (Simulation)",
    period: "July 2025",
    description:
      "Applied IAM principles and security best practices, and delivered technical documentation and stakeholder presentations.",
  },
  {
    company: "Deloitte Australia Cyber Job Simulation",
    role: "Security Operations (Simulation)",
    period: "June 2025",
    description:
      "Performed suspicious activity triage and incident scoping on web activity logs during a simulated breach.",
  },
];

export const CERTIFICATIONS = [
  "Certified Ethical Hacker (CEH) v12 — EC-Council",
  "Google Cybersecurity Professional — Google",
  "CC Certified in Cybersecurity — ISC2",
  "Cisco Certified Network Associate (CCNA) v7 — Cisco",
] as const;

export const PROJECTS: ProjectItem[] = [
  {
    title: "Malware Scanner",
    category: "Static Malware Detection",
    description:
      "9-module Python scanner with hash lookup, YARA, PE behavior analysis, entropy checks, fuzzy matching, archive scanning, phishing detection, VirusTotal enrichment, and SQLite cache.",
    tech: "Python, YARA, CustomTkinter, SQLite",
    link: "https://github.com/HanuTyagi/Malware-Scanner",
  },
  {
    title: "FUDMal",
    category: "Adversary Emulation Lab",
    description:
      "Windows-focused red/blue team training toolkit with 9 MITRE ATT&CK-mapped simulation tabs and optional auto-cleanup for safe lab usage.",
    tech: "Python, Tkinter, PyInstaller, MITRE ATT&CK",
    link: "https://github.com/HanuTyagi/FUDMal",
  },
  {
    title: "RedScan",
    category: "Network Intelligence Platform",
    description:
      "Unified GUI + backend scanner with 80+ profiles, visual command factory, async parser, conflict manager, adaptive PID+AIMD rate control, and optional API auth.",
    tech: "Python, FastAPI, Nmap, OpenAI/Gemini",
    link: "https://github.com/HanuTyagi/RedScan",
  },
];
