import Link from "next/link";
import CyberBackground from "@/components/CyberBackground";

export default function Hobbies() {
  const currentNovels = [
    "I make games inside a mobile game?!",
    "Slime Evolution",
    "The game at carousel: a horror movie litrpg",
    "A regressor's tale of cultivation"
  ];

  const favNovels = [
    "My Vampire System",
    "Myriad Realms Gatekeeper",
    "World Apocalypse Online",
    "Shadow Slave",
    "Lord of the Mysteries"
  ];

  const currentShows = [
    "Stargate SG1",
    "The Walking Dead"
  ];

  const favShows = [
    "From",
    "Dexter",
    "Doctor Who"
  ];

  return (
    <main className="bg-[var(--color-background)] min-h-screen relative overflow-x-hidden text-slate-100 font-mono selection:bg-[var(--color-primary)]/30">
      <CyberBackground />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center animated-link mb-12 transition-colors group">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          [ return to / ]
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-8 text-white glitch-text tracking-tighter" data-text="./idle_mode.sh">
          ./idle_mode.sh
        </h1>
        <p className="text-[var(--color-primary)]/80 mb-12 text-lg">System idle. Engaging entertainment protocols...</p>

        {/* Web Novels Section */}
        <section className="bg-black/60 p-8 rounded border border-blue-500/20 backdrop-blur-md mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-blue-500/30 pb-4 mb-6">
            <h2 className="text-3xl font-bold text-blue-400">
              Web Novels
            </h2>
            <div className="text-blue-300/60 mt-2 md:mt-0 text-sm">
              <span className="mr-4"><strong>READ:</strong> 1622 Books</span>
              <span><strong>RUNTIME:</strong> 2167.2 Hours</span>
            </div>
          </div>
          
          <p className="text-slate-300 mb-8 italic">
            "I've been reading web novels since 12th standard, and I'm hoping to write my own fiction soon."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Currently Reading
              </h3>
              <ul className="space-y-2 text-slate-300">
                {currentNovels.map((novel, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-500 mr-2 text-sm">►</span>
                    {novel}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                All-Time Favorites
              </h3>
              <ul className="space-y-2 text-slate-300">
                {favNovels.map((novel, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-yellow-500 mr-2 text-sm">★</span>
                    {novel}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* TV Shows Section */}
        <section className="bg-black/60 p-8 rounded border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-purple-400 border-b border-purple-500/30 pb-4 mb-6">
            Screen Time
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                Currently Watching
              </h3>
              <ul className="space-y-2 text-slate-300">
                {currentShows.map((show, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-purple-500 mr-2 text-sm">►</span>
                    {show}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                All-Time Favorites
              </h3>
              <ul className="space-y-2 text-slate-300">
                {favShows.map((show, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-yellow-500 mr-2 text-sm">★</span>
                    {show}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
