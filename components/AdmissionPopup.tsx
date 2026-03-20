"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const COOKIE = "rf_popup_dismissed";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  return document.cookie.split("; ").find(r => r.startsWith(name + "=")) ?? null;
}
function setCookie(name: string, days: number) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=1; expires=${exp}; path=/; SameSite=Lax`;
}

export default function AdmissionPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (getCookie(COOKIE)) return;
    const t = setTimeout(() => setVisible(true), 2800);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); }, 380);
    setCookie(COOKIE, 3);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-400 ${closing ? "opacity-0" : "opacity-100"}`}
      style={{ background: "rgba(2,8,23,0.75)", backdropFilter: "blur(10px)" }}
      onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className={`relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-400 ${closing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
        style={{ background: "linear-gradient(160deg,#0c1a2e 0%,#0f172a 100%)" }}
      >
        {/* Top accent line */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4,#2563eb)" }} />

        {/* Hero image */}
        <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
          <Image
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=85"
            alt="Students building robots"
            fill
            className="object-cover object-center"
            sizes="600px"
            unoptimized
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(12,26,46,0.2) 0%, rgba(12,26,46,0.7) 70%, rgba(12,26,46,1) 100%)" }} />

          {/* Badge on image */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-[11px] font-bold uppercase tracking-wider">Admissions Open</span>
          </div>

          {/* Year badge */}
          <div className="absolute top-4 right-14 px-3 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-sm border border-blue-400/30">
            <span className="text-white text-[11px] font-bold uppercase tracking-wider">Summer 2026</span>
          </div>

          {/* Headline on image */}
          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-1">RoboFlight Academy · New Brunswick</p>
            <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight tracking-tight">
              Build Drones,{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg,#38bdf8,#06b6d4)" }}>
                Robots &amp; Futures
              </span>
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 pt-4">
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            Limited spots available for Summer 2026. Enrol your child in New Brunswick&apos;s most exciting
            hands-on STEM program — real drones, real robots, real skills.
          </p>

          {/* Program highlights */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&q=75", label: "Drone Building" },
              { img: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=300&q=75", label: "Robot Cars" },
              { img: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=300&q=75", label: "RC Planes" },
            ].map(c => (
              <div key={c.label} className="relative rounded-xl overflow-hidden border border-white/8" style={{ height: 80 }}>
                <Image src={c.img} alt={c.label} fill className="object-cover" sizes="150px" unoptimized />
                <div className="absolute inset-0 bg-slate-900/50" />
                <p className="absolute bottom-1.5 left-0 right-0 text-center text-white text-[10px] font-bold">{c.label}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-4 mb-5 px-2">
            {[
              { val: "100+", label: "Students" },
              { val: "3",    label: "Schools" },
              { val: "June", label: "Starts" },
            ].map(s => (
              <div key={s.label} className="flex-1 text-center py-2 rounded-xl bg-white/4 border border-white/6">
                <p className="text-cyan-400 font-black text-lg leading-none">{s.val}</p>
                <p className="text-white/30 text-[10px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <Link
            href="/#contact"
            onClick={dismiss}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-sm mb-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-600/25"
            style={{ background: "linear-gradient(135deg,#2563eb 0%,#0891b2 100%)" }}
          >
            🚀 Reserve a Spot for Summer 2026
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <button
            onClick={dismiss}
            className="w-full py-2.5 rounded-2xl border border-white/8 text-white/30 hover:text-white/60 hover:border-white/15 text-xs font-medium transition-all cursor-pointer"
          >
            Remind me later
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/60 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
