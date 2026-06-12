"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { EASTER_EGGS, EasterEggId } from "@/constants/investigation";

type InvestigationContextValue = {
  threatLevel: number;
  increaseThreat: (amount: number, reason?: string) => void;
  unlockedEggs: EasterEggId[];
  unlockEgg: (egg: EasterEggId) => void;
  isPenTestMode: boolean;
  unlockPenTestMode: (source?: string) => void;
  isAdminMode: boolean;
  unlockAdminMode: () => void;
  glitching: boolean;
  triggerGlitch: (message?: string) => void;
  glitchMessage: string;
  activeInvestigations: number;
};

const InvestigationContext = createContext<InvestigationContextValue | null>(null);

const STORAGE_KEY = "investigation-portal-state-v1";

type StoredState = {
  threatLevel?: number;
  unlockedEggs?: EasterEggId[];
  isPenTestMode?: boolean;
  isAdminMode?: boolean;
};

export function InvestigationProvider({ children }: { children: React.ReactNode }) {
  const [threatLevel, setThreatLevel] = useState(0);
  const [unlockedEggs, setUnlockedEggs] = useState<EasterEggId[]>([]);
  const [isPenTestMode, setIsPenTestMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [glitchMessage, setGlitchMessage] = useState("ENCRYPTED PAYLOAD DETECTED");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredState;
      setThreatLevel(Math.min(100, Math.max(0, parsed.threatLevel ?? 0)));
      setUnlockedEggs((parsed.unlockedEggs ?? []).filter((egg): egg is EasterEggId => EASTER_EGGS.includes(egg)));
      setIsPenTestMode(Boolean(parsed.isPenTestMode));
      setIsAdminMode(Boolean(parsed.isAdminMode));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const payload: StoredState = { threatLevel, unlockedEggs, isPenTestMode, isAdminMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [threatLevel, unlockedEggs, isPenTestMode, isAdminMode]);

  const triggerGlitch = useCallback((message = "HIDDEN SIGNAL DECRYPTING...") => {
    setGlitchMessage(message);
    setGlitching(true);
    window.setTimeout(() => setGlitching(false), 1800);
  }, []);

  const unlockEgg = useCallback((egg: EasterEggId) => {
    setUnlockedEggs((current) => {
      if (current.includes(egg)) return current;
      window.dispatchEvent(new CustomEvent("investigation:egg", { detail: { egg } }));
      return [...current, egg];
    });
    triggerGlitch(`SECRET UNLOCKED: ${egg.toUpperCase()}`);
  }, [triggerGlitch]);

  const increaseThreat = useCallback((amount: number, reason = "analyst interaction") => {
    setThreatLevel((current) => {
      const next = Math.min(100, current + amount);
      if (next >= 100 && current < 100) {
        window.dispatchEvent(new CustomEvent("investigation:breach", { detail: { reason } }));
      }
      return next;
    });
  }, []);

  const unlockPenTestMode = useCallback((source = "manual trigger") => {
    setIsPenTestMode(true);
    unlockEgg(source.includes("console") ? "console_pentest" : "pentest_mode");
    increaseThreat(20, "pen test mode unlocked");
  }, [increaseThreat, unlockEgg]);

  const unlockAdminMode = useCallback(() => {
    setIsAdminMode(true);
    unlockEgg("sysadmin_pixel");
    increaseThreat(15, "hidden admin pixel");
  }, [increaseThreat, unlockEgg]);


  useEffect(() => {
    const handleExternalEgg = (event: Event) => {
      const egg = (event as CustomEvent<{ egg?: EasterEggId }>).detail?.egg;
      if (egg && EASTER_EGGS.includes(egg)) {
        setUnlockedEggs((current) => current.includes(egg) ? current : [...current, egg]);
        increaseThreat(15, `external egg ${egg}`);
      }
    };
    window.addEventListener("investigation:egg", handleExternalEgg);
    return () => window.removeEventListener("investigation:egg", handleExternalEgg);
  }, [increaseThreat]);

  useEffect(() => {
    const handleConsole = (event: Event) => {
      const command = (event as CustomEvent<string>).detail;
      if (command === "pentest") unlockPenTestMode("console command");
      if (command === "decrypt") {
        unlockEgg("console_decrypt");
        increaseThreat(15, "console decrypt");
      }
      if (command === "exploit") {
        unlockEgg("console_exploit");
        increaseThreat(15, "console exploit");
      }
      if (command === "patch") {
        unlockEgg("console_patch");
        increaseThreat(30, "console patch challenge");
      }
    };
    window.addEventListener("investigation:console", handleConsole);
    return () => window.removeEventListener("investigation:console", handleConsole);
  }, [increaseThreat, unlockEgg, unlockPenTestMode]);

  useEffect(() => {
    const handleBreach = () => {
      unlockEgg("master_backdoor");
      triggerGlitch("SYSTEM_BREACH // MASTER BACKDOOR FOUND");
    };
    window.addEventListener("investigation:breach", handleBreach);
    return () => window.removeEventListener("investigation:breach", handleBreach);
  }, [triggerGlitch, unlockEgg]);

  const value = useMemo<InvestigationContextValue>(() => ({
    threatLevel,
    increaseThreat,
    unlockedEggs,
    unlockEgg,
    isPenTestMode,
    unlockPenTestMode,
    isAdminMode,
    unlockAdminMode,
    glitching,
    triggerGlitch,
    glitchMessage,
    activeInvestigations: 3,
  }), [glitchMessage, glitching, increaseThreat, isAdminMode, isPenTestMode, threatLevel, triggerGlitch, unlockAdminMode, unlockEgg, unlockPenTestMode, unlockedEggs]);

  return <InvestigationContext.Provider value={value}>{children}</InvestigationContext.Provider>;
}

export function useInvestigation() {
  const ctx = useContext(InvestigationContext);
  if (!ctx) throw new Error("useInvestigation must be used inside InvestigationProvider");
  return ctx;
}
