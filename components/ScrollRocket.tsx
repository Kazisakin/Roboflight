"use client";

import { useEffect, useState } from "react";

export default function ScrollRocket() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bottomVh = 5 + progress * 78;
  const trailHeight = Math.round(progress * 200);

  return (
    <div
      className="fixed right-5 z-50 pointer-events-none"
      style={{ bottom: `${bottomVh}vh`, transition: "bottom 0.12s linear" }}
    >
      {/* Dashed trail */}
      {trailHeight > 4 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full"
          style={{
            width: "2px",
            height: `${trailHeight}px`,
            background:
              "repeating-linear-gradient(to bottom, #22d3ee 0px, #22d3ee 7px, transparent 7px, transparent 14px)",
            opacity: 0.55,
          }}
        />
      )}

      {/* Rocket */}
      <svg
        width="30"
        height="38"
        viewBox="0 0 30 38"
        fill="none"
        style={{ filter: "drop-shadow(0 0 7px #22d3ee99)" }}
      >
        {/* Body */}
        <path
          d="M15 2 C9 8 7 16 7 23 L12 23 L12 30 L18 30 L18 23 L23 23 C23 16 21 8 15 2Z"
          fill="#1e40af"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        {/* Window */}
        <circle cx="15" cy="14" r="4" fill="#22d3ee" stroke="#7dd3fc" strokeWidth="1" />
        <circle cx="15" cy="14" r="2.2" fill="#e0f2fe" opacity="0.8" />
        {/* Fins */}
        <path d="M7 25 L3 33 L12 30" fill="#f97316" stroke="#fb923c" strokeWidth="0.8" />
        <path d="M23 25 L27 33 L18 30" fill="#f97316" stroke="#fb923c" strokeWidth="0.8" />
        {/* Flame */}
        {progress > 0.02 && (
          <ellipse
            cx="15"
            cy="32"
            rx="4"
            ry={2.5 + progress * 5}
            fill="url(#flameGrad)"
            opacity="0.9"
            style={{ animation: "glow-pulse 0.35s ease-in-out infinite" }}
          />
        )}
        <defs>
          <linearGradient id="flameGrad" x1="15" y1="30" x2="15" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
