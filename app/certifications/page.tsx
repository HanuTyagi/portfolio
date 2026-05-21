import Link from "next/link";
import CyberBackground from "@/components/CyberBackground";

export default function Certifications() {
  const currentLearning = [
    {
      title: "Biohacking Essentials",
      desc: "Optimize your body, mind, and performance with science and awareness."
    },
    {
      title: "Medical Device Penetration Testing",
      desc: "From Fundamentals to Advanced Exploitation of Connected Medical Systems."
    },
    {
      title: "Start Writing Fiction",
      desc: "Get started with your own fiction writing, focusing on the central skill of creating characters."
    }
  ];

  const prep = [
    "Certified Red Team Practitioner (CRTP)",
    "Certified Network Security Practitioner (CNSP)"
  ];

  const expired = [
    "Introduction to Critical Infrastructure Protection (ICIP) by OPSWAT Academy",
    "OPSWAT Network Security Associate (ONSA)",
    "OPSWAT Web Traffic Protection Associate (OWPA)",
    "OPSWAT Data Transfer Security Associate (ODSA)",
    "OPSWAT Email Security Associate (OESA)",
    "OPSWAT File Security Associate (OFSA)",
    "OPSWAT Secure Storage Associate (OSSA)",
    "OPSWAT Endpoint Compliance Associate (OECA)",
    "OPSWAT Legacy System Security Associate (OLSA)"
  ];

  return (
    <main className="bg-[#05080d] min-h-screen relative overflow-x-hidden text-emerald-50 font-mono selection:bg-emerald-500/30">
      <CyberBackground />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-12 transition-colors group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          [ return to / ]
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-12 mt-8 text-white glitch-text tracking-tighter" data-text="cat certs.txt">
          cat certs.txt
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Left Column */}
          <div className="space-y-12">
            <section className="bg-black/60 p-6 rounded border border-emerald-500/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-emerald-400 border-b border-emerald-500/30 pb-2 mb-4">
                Current Objectives
              </h2>
              <ul className="space-y-3 text-slate-300">
                {prep.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-emerald-500 mr-2">»</span>
                    <span>Preparing for <strong className="text-white">{item}</strong></span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-black/60 p-6 rounded border border-emerald-500/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-emerald-400 border-b border-emerald-500/30 pb-2 mb-4">
                Currently Learning
              </h2>
              <div className="space-y-6">
                {currentLearning.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
             <section className="bg-black/60 p-6 rounded border border-emerald-500/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-emerald-400 border-b border-emerald-500/30 pb-2 mb-4">
                Active Certifications
              </h2>
              <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">»</span>
                    <span><strong>Certified Ethical Hacker (CEH v12)</strong> - Passed 1st attempt during B.Tech</span>
                  </li>
              </ul>
            </section>

            <section className="bg-black/60 p-6 rounded border border-emerald-500/20 backdrop-blur-sm opacity-80">
              <h2 className="text-2xl font-bold text-slate-400 border-b border-slate-600 pb-2 mb-4 flex justify-between items-end">
                <span>Legacy / Expired</span>
                <span className="text-xs font-normal text-slate-500 bg-slate-800/50 px-2 py-1 rounded">Archived</span>
              </h2>
              <ul className="space-y-2 text-slate-400 text-sm">
                {expired.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-slate-600 mr-2">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

        </div>

      </div>
    </main>
  );
}
