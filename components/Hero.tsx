"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HERO_LINES } from "@/constants/portfolio";
import { useTripleTap } from "@/hooks/useTripleTap";

const Typewriter = ({ lines, delay = 0 }: { lines: readonly string[]; delay?: number }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let typingInterval: ReturnType<typeof setInterval>;

    const startTyping = () => {
      let currentLineIdx = 0;
      let currentCharIdx = 0;
      const newLines: string[] = [];

      typingInterval = setInterval(() => {
        if (currentLineIdx < lines.length) {
          const currentLine = lines[currentLineIdx];
          if (currentCharIdx < currentLine.length) {
            if (newLines[currentLineIdx] === undefined) {
              newLines[currentLineIdx] = "";
            }
            newLines[currentLineIdx] = currentLine.substring(0, currentCharIdx + 1);
            setDisplayedLines([...newLines]);
            currentCharIdx++;
          } else {
            currentLineIdx++;
            currentCharIdx = 0;
          }
        } else {
          setIsDone(true);
          clearInterval(typingInterval);
        }
      }, 30);
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(typingInterval);
    };
  }, [lines, delay]);

  return (
    <div className="font-mono text-[var(--color-secondary)] text-left inline-block">
      {displayedLines.map((line, i) => (
        <div key={`${i}-${line}`} className="mb-1">
          {`> `}
          {line}
          {i === displayedLines.length - 1 && !isDone && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-5 bg-[var(--color-secondary)] ml-1 align-middle"
            />
          )}
        </div>
      ))}
      {isDone && (
        <div>
          {`> `}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-5 bg-[var(--color-secondary)] ml-1 align-middle"
          />
        </div>
      )}
    </div>
  );
};

export default function Hero() {
  const router = useRouter();

  const { handleTap } = useTripleTap({
    onTripleTap: () => {
      document.body.classList.add("bg-glitch", "active");
      setTimeout(() => {
        document.body.classList.remove("bg-glitch", "active");
        router.push("/about");
      }, 500);
    },
  });

  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1
          onClick={handleTap}
          className="heading-font text-5xl md:text-8xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,0,110,0.25)] glitch-text mb-6 cursor-pointer select-none"
          data-text="Bhavishya Tyagi"
          title="Tap me 3 times"
        >
          Bhavishya Tyagi
        </h1>

        <div className="text-lg md:text-xl text-slate-200 mt-6 font-light tracking-wide min-h-[100px] flex justify-center">
          <Typewriter lines={HERO_LINES} delay={500} />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a href="#skills" className="interactive-button">
            [ VIEW_ARSENAL ]
          </a>
          <a href="#contact" className="interactive-button-secondary">
            [ INITIATE_CONTACT ]
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
