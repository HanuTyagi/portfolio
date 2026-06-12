"use client";

import { useEffect, useRef } from "react";

export default function ResonanceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrame = 0;
    const pointer = { x: 0, y: 0, hasMoved: false };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!pointer.hasMoved) {
        pointer.x = canvas.width * 0.5;
        pointer.y = canvas.height * 0.5;
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.hasMoved = true;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    const draw = (time: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = context.createRadialGradient(
        pointer.x,
        pointer.y,
        40,
        pointer.x,
        pointer.y,
        Math.max(canvas.width, canvas.height) * 0.5,
      );
      gradient.addColorStop(0, "rgba(255, 0, 110, 0.1)");
      gradient.addColorStop(0.45, "rgba(131, 56, 236, 0.08)");
      gradient.addColorStop(1, "rgba(10, 14, 39, 0)");

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 4; i++) {
        const radius = 90 + i * 42 + Math.sin(time * 0.0018 + i) * 10;
        context.beginPath();
        context.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${i % 2 === 0 ? "255, 0, 110" : "0, 217, 255"}, ${0.14 - i * 0.02})`;
        context.lineWidth = 1;
        context.stroke();
      }

      for (let waveIndex = 0; waveIndex < 3; waveIndex++) {
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = `rgba(0, 217, 255, ${0.12 - waveIndex * 0.03})`;

        const amplitude = 18 + waveIndex * 10;
        const frequency = 0.014 + waveIndex * 0.003;
        const phase = time * 0.0012 + waveIndex * 0.8;

        for (let x = 0; x <= canvas.width; x += 14) {
          const distanceFactor = Math.max(0.2, 1 - Math.abs(pointer.x - x) / canvas.width);
          const y =
            canvas.height * (0.32 + waveIndex * 0.18) +
            Math.sin(x * frequency + phase) * amplitude * distanceFactor +
            (pointer.y - canvas.height / 2) * 0.015;

          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />;
}
