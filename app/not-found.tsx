import Link from "next/link";
import CyberBackground from "@/components/CyberBackground";

export default function NotFound() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen relative overflow-x-hidden text-slate-100 font-mono selection:bg-[var(--color-primary)]/30 flex items-center justify-center">
      <CyberBackground />
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-24 text-center bg-black/80 p-12 rounded border border-red-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.1)]">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-red-500 tracking-tighter drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          UNAUTHORIZED ACCESS DETECTED
        </h2>
        
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          The requested resource could not be located in the current directory tree. Your IP address has been logged.
        </p>

        <div className="inline-block border border-red-500/20 p-4 mb-10 text-left bg-red-950/20 w-full max-w-md">
            <div className="text-red-400 text-sm">
                <span className="text-red-500 mr-2">›</span>
                <span className="opacity-70">Tracing packet route...</span>
            </div>
            <div className="text-red-400 text-sm">
                <span className="text-red-500 mr-2">›</span>
                <span className="opacity-70">Destination unreachable.</span>
            </div>
            <div className="text-red-400 text-sm mt-2">
                <span className="text-red-500 mr-2 animate-pulse">_</span>
            </div>
        </div>

        <div>
            <Link 
                href="/" 
                className="px-8 py-3 bg-red-500/10 border border-red-500 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all font-mono inline-block"
            >
                [ ABORT & RETURN TO SAFETY ]
            </Link>
        </div>
      </div>
    </main>
  );
}
