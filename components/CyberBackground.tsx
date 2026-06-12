"use client";

import { useEffect, useRef, useState } from "react";

const PARTICLE_LINK_DISTANCE = 110;
const PARTICLE_LINK_DISTANCE_SQUARED = PARTICLE_LINK_DISTANCE * PARTICLE_LINK_DISTANCE;
const GRID_CELL_SIZE = 120;

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0, 217, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const gridKey = (x: number, y: number) => `${x},${y}`;

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        setIsGlitching(true);
        if (glitchTimeoutRef.current) {
          clearTimeout(glitchTimeoutRef.current);
        }
        glitchTimeoutRef.current = setTimeout(() => setIsGlitching(false), 300);
      }
    }, 2000);

    return () => {
      clearInterval(glitchInterval);
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId = 0;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const initParticles = () => {
      particlesArray = [];
      const density = window.innerWidth < 768 ? 18000 : 9000;
      const numberOfParticles = (canvas.width * canvas.height) / density;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(canvas.width, canvas.height));
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseout", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0a0e27";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const spatialGrid = new Map<string, number[]>();

      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);

        const cellX = Math.floor(particle.x / GRID_CELL_SIZE);
        const cellY = Math.floor(particle.y / GRID_CELL_SIZE);
        const key = gridKey(cellX, cellY);

        const cell = spatialGrid.get(key);
        if (cell) {
          cell.push(i);
        } else {
          spatialGrid.set(key, [i]);
        }

        const dxMouse = particle.x - mouse.x;
        const dyMouse = particle.y - mouse.y;
        const distanceMouseSquared = dxMouse * dxMouse + dyMouse * dyMouse;

        if (distanceMouseSquared < 22500) {
          const distanceMouse = Math.sqrt(distanceMouseSquared);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 0, 110, ${0.32 - distanceMouse / 500})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          particle.x += dxMouse * 0.01;
          particle.y += dyMouse * 0.01;
        }
      }

      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        const cellX = Math.floor(particle.x / GRID_CELL_SIZE);
        const cellY = Math.floor(particle.y / GRID_CELL_SIZE);

        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          for (let offsetY = -1; offsetY <= 1; offsetY++) {
            const neighborCell = spatialGrid.get(gridKey(cellX + offsetX, cellY + offsetY));
            if (!neighborCell) {
              continue;
            }

            for (let n = 0; n < neighborCell.length; n++) {
              const neighborIndex = neighborCell[n];
              if (neighborIndex <= i) {
                continue;
              }

              const neighbor = particlesArray[neighborIndex];
              const dx = particle.x - neighbor.x;
              const dy = particle.y - neighbor.y;
              const distanceSquared = dx * dx + dy * dy;

              if (distanceSquared < PARTICLE_LINK_DISTANCE_SQUARED) {
                const distance = Math.sqrt(distanceSquared);
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 217, 255, ${0.22 - distance / 520})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(neighbor.x, neighbor.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className={`bg-glitch ${isGlitching ? "active" : ""}`}></div>
      <canvas ref={canvasRef} className="block w-full h-full object-cover bg-[#0a0e27]" />
    </div>
  );
}
