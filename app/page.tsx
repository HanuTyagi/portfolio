import CyberBackground from "@/components/CyberBackground";
import ResonanceBackground from "@/components/ResonanceBackground";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Scanner from "@/components/Scanner";
import IdleProtocol from "@/components/IdleProtocol";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen relative overflow-x-hidden">
      <CyberBackground />
      <ResonanceBackground />
      <IdleProtocol />
      <Hero />
      <SectionDivider />
      <Stats />
      <SectionDivider flip />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider flip />
      <Projects />
      <SectionDivider />
      <section id="contact" className="relative z-20 bg-black/35 py-10 px-4 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="heading-font text-2xl text-white font-semibold mb-3">Connect</h3>
          <p className="text-slate-300 mb-4">
            Open to cybersecurity research, penetration testing, and security engineering collaborations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-6">
            <a className="animated-link" href="mailto:hanutyagi9@gmail.com">
              hanutyagi9@gmail.com
            </a>
            <span className="text-slate-500">|</span>
            <a className="animated-link" href="tel:+917983475910">
              +91 79834 75910
            </a>
            <span className="text-slate-500">|</span>
            <a className="animated-link" href="https://github.com/HanuTyagi" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="text-slate-500">|</span>
            <a className="animated-link" href="https://tryhackme.com/p/BhavishyaTyagi" target="_blank" rel="noreferrer">
              TryHackMe
            </a>
            <span className="text-slate-500">|</span>
            <a className="animated-link" href="https://www.linkedin.com/in/Bhavishya-Hanu/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      <footer className="relative z-50 py-8 text-center text-slate-400 text-sm flex flex-col items-center gap-4 bg-black/55 backdrop-blur-sm border-t border-[var(--color-accent)]/20">
        <div>© {new Date().getFullYear()} Bhavishya Tyagi.</div>
        <Scanner />
      </footer>
    </main>
  );
}
