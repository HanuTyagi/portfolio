import Link from "next/link";
import CyberBackground from "@/components/CyberBackground";

export default function Arsenal() {
  const projects = [
    {
      title: "Malware Scanner",
      description: "Simple Signature based Malware Scanner. Scans files against a known database of malware signatures to detect malicious executables.",
      link: "https://github.com/HanuTyagi/Malware-Scanner"
    },
    {
      title: "FUDMal — Adversary-Emulation Lab",
      description: "A comprehensive adversary emulation lab focused on creating and analyzing fully undetectable (FUD) malware techniques.",
      link: "https://github.com/HanuTyagi/FUDMal"
    },
    {
      title: "RedScan – Network Intelligence",
      description: "A network intelligence platform for advanced reconnaissance, vulnerability scanning, and red team automation.",
      link: "https://github.com/HanuTyagi/RedScan"
    },
    {
      title: "TeleCopy",
      description: "Telegram Message Copier & Archiver. Tool to safely extract and back up messages from Telegram channels for OSINT purposes.",
      link: "https://github.com/HanuTyagi/TeleCopy"
    },
    {
      title: "Devils-Cipher",
      description: "Custom encryption/decryption utility demonstrating cryptographic primitives and steganography concepts.",
      link: "https://github.com/HanuTyagi/Devils-Cipher"
    },
    {
      title: "Packet Sniffer",
      description: "A low-level network packet sniffer capable of intercepting and analyzing traffic to capture source/destination IPs and payloads.",
      link: "https://github.com/HanuTyagi/Packet-Sniffer"
    },
    {
      title: "Wi-Fi Attack & Defense",
      description: "A suite of tools and scripts built around airmon-ng for wireless network auditing and defense mechanisms.",
      link: "https://github.com/HanuTyagi/airmon-ng-script"
    },
    {
      title: "Random Password Generator",
      description: "A robust random password generator prioritizing entropy, designed to thwart brute-force and dictionary attacks.",
      link: "https://github.com/HanuTyagi/R.P.G"
    }
  ];

  return (
    <main className="bg-[#05080d] min-h-screen relative overflow-x-hidden text-emerald-50 font-mono selection:bg-emerald-500/30">
      <CyberBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-12 transition-colors group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          [ return to / ]
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-8 mt-8 text-white glitch-text tracking-tighter" data-text="ls ./arsenal">
          ls ./arsenal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, idx) => (
            <a 
              key={idx} 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 rounded border border-emerald-500/20 bg-black/60 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all backdrop-blur-sm group hover:shadow-[3px_0_0_rgba(255,0,0,0.5),-3px_0_0_rgba(0,255,255,0.5)] hover:-translate-x-1"
            >
              <h3 className="text-xl font-bold text-emerald-400 mb-3 group-hover:text-emerald-300">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 text-xs text-emerald-500/50 group-hover:text-emerald-400 transition-colors">
                [ execute ]
              </div>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}
