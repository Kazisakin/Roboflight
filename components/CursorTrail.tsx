"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#22d3ee", "#38bdf8", "#7dd3fc", "#bae6fd", "#ffffff", "#fbbf24"];

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dots = useRef<{ x: number; y: number; age: number; size: number; color: string }[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      dots.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        size: Math.random() * 5 + 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      if (dots.current.length > 22) dots.current.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.current = dots.current.filter((d) => d.age < 1);
      dots.current.forEach((d) => {
        d.age += 0.045;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * (1 - d.age * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = (1 - d.age) * 0.65;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      raf.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9997] pointer-events-none" />;
}
