"use client";

import { InvestigationFilter } from "@/constants/investigation";
import { useInvestigation } from "@/context/InvestigationContext";

const filters: { id: InvestigationFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tools", label: "Tools" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
];

export default function SearchFilter({ active, onChange }: { active: InvestigationFilter; onChange: (filter: InvestigationFilter) => void }) {
  const { increaseThreat } = useInvestigation();

  return (
    <div className="sticky top-0 z-40 border-y border-cyan-400/20 bg-[#070a18]/85 px-4 py-4 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-pink-300">Investigation Query Console</p>
          <h2 className="text-xl font-bold text-white md:text-2xl">Filter active intelligence streams</h2>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Investigation filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={active === filter.id}
              onClick={() => {
                onChange(filter.id);
                increaseThreat(3, `filter ${filter.id}`);
              }}
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,217,255,0.25)] ${
                active === filter.id
                  ? "border-pink-400 bg-pink-500/20 text-pink-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/60 hover:text-cyan-100"
              }`}
            >
              [{filter.label}]
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
