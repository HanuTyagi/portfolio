import Link from "next/link";
import CyberBackground from "@/components/CyberBackground";

export default function About() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen relative overflow-x-hidden text-slate-100 font-mono selection:bg-[var(--color-primary)]/30">
      <CyberBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center animated-link mb-12 transition-colors group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          [ return to / ]
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-8 mt-8 text-white glitch-text tracking-tighter" data-text="whoami">
          whoami
        </h1>

        <div className="space-y-8 text-lg text-slate-300 bg-black/60 p-8 rounded-lg border border-[var(--color-accent)]/30 backdrop-blur-md">
          <p className="leading-relaxed text-slate-100">
            I am Bhavishya Tyagi, 23 years old, currently pursuing my M.Tech from UPES after completing my B.Tech from GEHU with an 8.02 CGPA. My journey is defined by a deep curiosity for how things work—and how they break.
          </p>

          <div className="relative border-l border-[var(--color-secondary)]/40 pl-6 mt-12 space-y-10">
            {/* Timeline Item 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[var(--color-primary)] border-4 border-black"></div>
              <h3 className="text-xl font-bold text-[var(--color-secondary)]">The Genesis: LAN Games & Cheats</h3>
              <p className="text-sm text-slate-500 mb-2 mt-1">8th - 9th Grade</p>
              <p className="leading-relaxed">
                Back when the internet wasn't freely available, my friends and I would play offline LAN games. I began looking for ways to best my friends using cheats and mods—not just to win, but to create funny situations and get a laugh out of their reactions. This sparked my foundational interest in <span className="text-[var(--color-primary)]">programming and computer systems</span>.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[var(--color-primary)] border-4 border-black"></div>
              <h3 className="text-xl font-bold text-[var(--color-secondary)]">The Shift: Choosing the Ethical Path</h3>
              <p className="text-sm text-slate-500 mb-2 mt-1">High School to B.Tech</p>
              <p className="leading-relaxed">
                As I gained access to the internet, I noticed how technical skills were often misused for scamming and illegal activities. Seeing that, I made a conscious choice to pursue the path of an <span className="text-[var(--color-primary)]">ethical hacker</span>. I joined B.Tech CSE to fully immerse myself in technology and cybersecurity.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[var(--color-primary)] border-4 border-black"></div>
              <h3 className="text-xl font-bold text-[var(--color-secondary)]">Certification & Tool Building</h3>
              <p className="text-sm text-slate-500 mb-2 mt-1">B.Tech 3rd Year</p>
              <p className="leading-relaxed">
                Feeling prepared, I attempted the <strong className="text-[var(--color-primary)]">CEH v12 exam and passed it on my first attempt</strong>. I started applying my skills practically, developing tools like <span className="text-[var(--color-primary)]">FUDMal</span> (an adversary emulation lab) and <span className="text-[var(--color-primary)]">RedScan</span> (a network intelligence platform). I honed my skills in <span className="text-[var(--color-primary)]">Python, Bash, and Network Protocols</span>.
              </p>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[var(--color-primary)] border-4 border-black"></div>
              <h3 className="text-xl font-bold text-[var(--color-secondary)]">Mastery & Future</h3>
              <p className="text-sm text-slate-500 mb-2 mt-1">M.Tech (Current)</p>
              <p className="leading-relaxed">
                After graduation, I chose to pursue an M.Tech to consolidate my understanding of computers and security, ensuring no academic bottlenecks later in my career. Now, armed with experience in <span className="text-[var(--color-primary)]">Malware Analysis, Penetration Testing, and Python automation</span>, I am ready to engineer defensive solutions for modern threats.
              </p>
            </div>
          </div>

          <div className="mt-12 border-l-4 border-[var(--color-primary)] pl-6 py-4 bg-[var(--color-primary)]/10">
            <h3 className="text-xl text-[var(--color-secondary)] font-bold mb-2">Core Philosophy</h3>
            <p className="text-2xl font-serif italic text-slate-100">"Hackers are modern day magicians."</p>
          </div>
        </div>

      </div>
    </main>
  );
}
