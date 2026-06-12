export type InvestigationFilter = "all" | "tools" | "projects" | "experience" | "certifications";

export type CaseFile = {
  id: string;
  title: string;
  classification: string;
  status: string;
  statusTone: "closed" | "active" | "monitoring";
  summary: string;
  evidence: string[];
  codeSnippet: string;
  architecture: string;
  links: { label: string; href: string }[];
};

export type TimelineEvent = {
  year: string;
  title: string;
  type: "experience" | "education" | "certification";
  badge: string;
  details: string;
  milestones: string[];
};

export type ArsenalCategory = {
  title: string;
  codename: string;
  description: string;
  items: {
    name: string;
    description: string;
    proficiency: number;
    advancedDetail: string;
  }[];
};

export const THREAT_STATS = [
  { label: "Skills Deployed", value: "50+", pulse: "+ reconnaissance packages online" },
  { label: "Projects Completed", value: "3", pulse: "+ active case files indexed" },
  { label: "Vulnerabilities Mitigated", value: "100s", pulse: "+ lab findings remediated" },
  { label: "Threat Level", value: "CRITICAL", pulse: "+ expertise signature detected" },
];

export const CASE_FILES: CaseFile[] = [
  {
    id: "001",
    title: "Malware Scanner",
    classification: "Static Analysis",
    status: "CLOSED - SUCCESSFUL",
    statusTone: "closed",
    summary: "9-module Python malware scanner with hash lookup, YARA, PE behavior analysis, entropy checks, fuzzy matching, archive scanning, phishing detection, VirusTotal enrichment, and SQLite cache.",
    evidence: ["9 modules", "96.8K hashes analyzed", "YARA + PE triage", "SQLite enrichment cache"],
    codeSnippet: "if entropy(sample) > 7.2:\n    flag('packed_binary')\nvt_cache.enrich(sha256)",
    architecture: "Ingestion → hash reputation → YARA rules → PE heuristics → fuzzy match → analyst report.",
    links: [{ label: "View Code", href: "https://github.com/HanuTyagi/Malware-Scanner" }],
  },
  {
    id: "002",
    title: "FUDMal Lab",
    classification: "Red Team Operations",
    status: "ACTIVE",
    statusTone: "active",
    summary: "Windows-focused red/blue team training toolkit with 9 MITRE ATT&CK-mapped simulation tabs and optional auto-cleanup for safe lab usage.",
    evidence: ["9 MITRE ATT&CK simulations", "Safe lab toggles", "Auto-cleanup", "Operator workflow training"],
    codeSnippet: "technique = mitre.T1059\nrun_simulation(technique, cleanup=True)",
    architecture: "Simulation selector → ATT&CK procedure → telemetry capture → blue-team cleanup verification.",
    links: [{ label: "View Code", href: "https://github.com/HanuTyagi/FUDMal" }],
  },
  {
    id: "003",
    title: "RedScan",
    classification: "Network Intelligence",
    status: "MONITORING",
    statusTone: "monitoring",
    summary: "Unified GUI + backend scanner with 80+ profiles, visual command factory, async parser, conflict manager, adaptive PID+AIMD rate control, and optional API auth.",
    evidence: ["80+ scan profiles", "Async parser", "Adaptive rate control", "Optional API auth"],
    codeSnippet: "profile = command_factory.build(target)\nrate = aimd_controller.tune(latency)",
    architecture: "GUI command factory → backend queue → parser → conflict manager → prioritized findings.",
    links: [{ label: "View Code", href: "https://github.com/HanuTyagi/RedScan" }],
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2025",
    title: "Penetration Tester Internship",
    type: "experience",
    badge: "Evidence Badge",
    details: "Executed WiFi attack simulations, identified vulnerabilities, and built aircrack-ng automation scripts for reconnaissance and exploitation workflows at Deltaware Solution Private Limited.",
    milestones: ["WiFi attack simulation", "Automation scripts", "Recon-to-report workflow"],
  },
  {
    year: "2025",
    title: "Security Analyst Simulations",
    type: "experience",
    badge: "Incident Simulation",
    details: "Completed Tata Cybersecurity IAM and Deloitte Australia cyber job simulations covering stakeholder documentation, log triage, and breach scoping.",
    milestones: ["IAM principles", "Log triage", "Stakeholder reporting"],
  },
  {
    year: "2024",
    title: "M.Tech Cybersecurity Enrolled",
    type: "education",
    badge: "Milestones",
    details: "M.Tech in Computer Science at UPES with cybersecurity focus and 8.66 CGPA trajectory.",
    milestones: ["Advanced security coursework", "Research mindset", "Secure systems analysis"],
  },
  {
    year: "2023",
    title: "CEH Certification Completed",
    type: "certification",
    badge: "Achievement Badge",
    details: "Certified Ethical Hacker v12 credential added alongside Google Cybersecurity Professional, ISC2 CC, and Cisco CCNA v7 evidence artifacts.",
    milestones: ["Ethical hacking", "Network fundamentals", "Security operations"],
  },
];

export const ARSENAL: ArsenalCategory[] = [
  {
    title: "Offensive Tools",
    codename: "BREACH_KIT",
    description: "Controlled exploitation and adversary emulation utilities for validated lab environments.",
    items: [
      { name: "Metasploit", description: "Exploit validation and payload workflow testing.", proficiency: 86, advancedDetail: "Chains reconnaissance output into reproducible exploitation notes." },
      { name: "Burp Suite", description: "Web application interception and OWASP Top 10 validation.", proficiency: 88, advancedDetail: "Maps findings to clear remediation language for stakeholders." },
      { name: "Hydra / John", description: "Credential audit tooling for approved password assessments.", proficiency: 78, advancedDetail: "Balances attack simulation with lockout-safe test plans." },
    ],
  },
  {
    title: "Defensive Mechanisms",
    codename: "SHIELD_GRID",
    description: "Detection, triage, and evidence handling capabilities for incident response.",
    items: [
      { name: "Splunk", description: "Log triage, correlation, and incident scoping.", proficiency: 80, advancedDetail: "Builds analyst-friendly pivots around suspicious activity." },
      { name: "Suricata", description: "Network detection and packet-level alerting.", proficiency: 76, advancedDetail: "Pairs signatures with PCAP context to reduce false positives." },
      { name: "YARA", description: "Static malware signatures and sample clustering.", proficiency: 84, advancedDetail: "Used in Malware Scanner for repeatable static-analysis workflows." },
    ],
  },
  {
    title: "Reconnaissance Methods",
    codename: "SIGNAL_TRACE",
    description: "Network, OSINT, and service discovery methods that turn noise into hypotheses.",
    items: [
      { name: "Nmap", description: "Service discovery and profile-driven scanning.", proficiency: 90, advancedDetail: "RedScan includes 80+ scan profiles and conflict-aware command generation." },
      { name: "Wireshark / tcpdump", description: "Packet capture and protocol investigation.", proficiency: 82, advancedDetail: "Useful for validating exploit telemetry and blue-team detections." },
      { name: "OSINT", description: "Open-source intelligence and target context building.", proficiency: 79, advancedDetail: "Frames findings ethically before hands-on validation begins." },
    ],
  },
];

export const BRIEFING_CHALLENGES = [
  {
    id: "origin",
    prompt: "Decrypt file: analyst_origin.enc",
    hint: "What role title is printed in the hero?",
    answer: "analyst",
    revealed: "Bhavishya builds security tools from both attacker and defender perspectives: automate the boring parts, preserve evidence, and explain risk clearly.",
  },
  {
    id: "casework",
    prompt: "Decrypt file: casework_notes.enc",
    hint: "Case #002 maps simulations to which framework?",
    answer: "mitre",
    revealed: "The portfolio case files emphasize safe lab design: every offensive workflow should leave defenders with better detections and cleaner remediation steps.",
  },
];

export const EASTER_EGGS = [
  "konami_briefing",
  "scanner_sweep",
  "glitch_decode",
  "pentest_mode",
  "master_backdoor",
  "console_pentest",
  "console_decrypt",
  "console_exploit",
  "console_patch",
  "sysadmin_pixel",
] as const;

export type EasterEggId = (typeof EASTER_EGGS)[number];
