"use client";

import { useEffect, useRef, useState } from "react";

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
        ctx.fillStyle = "rgba(110, 231, 183, 0.6)"; // Emerald 300
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function CyberBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        // Random glitch trigger
        const glitchInterval = setInterval(() => {
            // 5% chance to glitch every 2 seconds
            if (Math.random() < 0.05) {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 300);
            }
        }, 2000);

        return () => clearInterval(glitchInterval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let animationFrameId: number;

        const mouse = {
            x: -1000,
            y: -1000,
        };

        const initParticles = () => {
            particlesArray = [];
            // Optimize for mobile by reducing particle density on small screens
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

        handleResize();
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove);
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }
        window.addEventListener("mouseout", handleMouseLeave);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw very dark background
            ctx.fillStyle = "#03060a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update(canvas.width, canvas.height);
                particlesArray[i].draw(ctx);

                // Check distance between particles
                for (let j = i; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(110, 231, 183, ${0.2 - distance / 500})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }

                // Check distance with mouse
                const dxMouse = particlesArray[i].x - mouse.x;
                const dyMouse = particlesArray[i].y - mouse.y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distanceMouse < 150) {
                     ctx.beginPath();
                     ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - distanceMouse / 500})`;
                     ctx.lineWidth = 1;
                     ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                     ctx.lineTo(mouse.x, mouse.y);
                     ctx.stroke();
                     
                     // Repel slightly
                     particlesArray[i].x += dxMouse * 0.01;
                     particlesArray[i].y += dyMouse * 0.01;
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
            <div className={`bg-glitch ${isGlitching ? 'active' : ''}`}></div>
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover bg-[#03060a]"
            />
        </div>
    );
}
