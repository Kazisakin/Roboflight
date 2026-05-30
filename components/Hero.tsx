"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FlyingDrone } from "@/components/SceneDecorations";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0f172a, #0c1a4e, #082f49, #071e3d, #0f172a)",
        backgroundSize: "400% 400%",
        animation: "bg-pan 18s ease infinite",
      }}
    >

      {/* Twinkling star field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 55 }).map((_, i) => {
          const size = Math.random() * 2.5 + 1;
          const dur = 1.5 + Math.random() * 3;
          const delay = Math.random() * 4;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: size,
                height: size,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${dur}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Circuit trace SVG background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ animation: "circuit-glow 4s ease-in-out infinite" }} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="#38bdf8" strokeWidth="1" strokeLinecap="round">
          <polyline points="100,50 100,200 300,200 300,350 500,350"/>
          <polyline points="1340,100 1200,100 1200,250 1000,250 1000,400 800,400"/>
          <polyline points="50,700 200,700 200,550 400,550 400,450"/>
          <polyline points="1400,800 1300,800 1300,650 1100,650 1100,500"/>
          <polyline points="600,30 600,150 750,150 750,80 900,80"/>
          <polyline points="200,880 200,780 400,780 400,680 600,680"/>
        </g>
        <g fill="#22d3ee">
          <circle cx="100" cy="200" r="3"/><circle cx="300" cy="200" r="3"/>
          <circle cx="300" cy="350" r="3"/><circle cx="1200" cy="100" r="3"/>
          <circle cx="1200" cy="250" r="3"/><circle cx="1000" cy="250" r="3"/>
          <circle cx="200" cy="700" r="3"/><circle cx="200" cy="550" r="3"/>
          <circle cx="1300" cy="650" r="3"/><circle cx="1100" cy="650" r="3"/>
          <circle cx="600" cy="150" r="3"/><circle cx="750" cy="150" r="3"/>
          <circle cx="400" cy="780" r="3"/>
        </g>
      </svg>

      {/* Big glowing blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[140px] animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[120px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: "6s" }} />
      </div>

      {/* Flying drone with dashed trail */}
      <FlyingDrone />

      {/* SVG star sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { pos: "top-16 left-16", size: 18, delay: "0s", opacity: "0.5" },
          { pos: "top-28 right-24", size: 14, delay: "0.8s", opacity: "0.4" },
          { pos: "top-1/2 left-10", size: 20, delay: "1.6s", opacity: "0.4" },
          { pos: "bottom-40 right-16", size: 16, delay: "2.4s", opacity: "0.5" },
          { pos: "top-2/5 right-1/3", size: 12, delay: "3.2s", opacity: "0.3" },
          { pos: "bottom-20 left-1/3", size: 10, delay: "1.2s", opacity: "0.35" },
        ].map((s, i) => (
          <svg key={i} className={`absolute ${s.pos} text-cyan-400 animate-star-pop`} style={{ animationDelay: s.delay, width: s.size, height: s.size, opacity: s.opacity }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="order-2 lg:order-1">

          {/* Pill badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-bold mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <svg className="w-3.5 h-3.5 animate-wiggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M15 12v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
            Coding · Electronics · Robotics
          </div>

          {/* BIG heading + particle burst */}
          <div className="relative">
            {mounted && (
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { angle: 0,   dist: 80,  color: "#22d3ee" },
                  { angle: 30,  dist: 100, color: "#fbbf24" },
                  { angle: 60,  dist: 90,  color: "#38bdf8" },
                  { angle: 90,  dist: 70,  color: "#ffffff" },
                  { angle: 120, dist: 110, color: "#22d3ee" },
                  { angle: 150, dist: 85,  color: "#a78bfa" },
                  { angle: 180, dist: 95,  color: "#38bdf8" },
                  { angle: 210, dist: 75,  color: "#fbbf24" },
                  { angle: 240, dist: 105, color: "#22d3ee" },
                  { angle: 270, dist: 80,  color: "#ffffff" },
                  { angle: 300, dist: 90,  color: "#38bdf8" },
                  { angle: 330, dist: 100, color: "#fbbf24" },
                ].map(({ angle, dist, color }, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const px = Math.cos(rad) * dist;
                  const py = Math.sin(rad) * dist;
                  return (
                    <div
                      key={i}
                      className="absolute w-2.5 h-2.5 rounded-full"
                      style={{
                        top: "40%", left: "35%",
                        background: color,
                        boxShadow: `0 0 6px ${color}`,
                        animation: "particle-out 1s ease-out forwards",
                        animationDelay: `${0.25 + i * 0.04}s`,
                        ["--px" as string]: `${px}px`,
                        ["--py" as string]: `${py}px`,
                      }}
                    />
                  );
                })}
              </div>
            )}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            Robotics,<br />
            Coding{" "}<span className="block sm:inline" style={{ background: "linear-gradient(135deg, #38bdf8, #22d3ee, #7dd3fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>&amp; Circuitry</span>
          </h1>
          </div>

          <p
            className={`text-base sm:text-lg text-white/55 max-w-md mb-8 leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            Empowering the next generation of innovators through hands-on robotics, drone building, and coding education across New Brunswick.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <button
              onClick={() => scrollTo("programs")}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-black text-base rounded-2xl transition-all duration-200 hover:scale-105 cursor-pointer shadow-xl shadow-cyan-500/30 text-blue-950"
              style={{ background: "linear-gradient(135deg, #22d3ee, #38bdf8)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Explore Programs
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 border-2 border-white/20 hover:border-cyan-400/50 text-white font-bold text-base rounded-2xl transition-all duration-200 cursor-pointer hover:bg-white/8"
            >
              Contact Us
            </button>
          </div>

          {/* Stats row */}
          <div
            className={`flex gap-8 sm:gap-10 mt-10 pt-8 border-t border-white/10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.55s" }}
          >
            {[
              { val: "100+", label: "Students" },
              { val: "75+",  label: "Projects" },
              { val: "3",    label: "Schools" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-white">{s.val}</p>
                <p className="text-white/40 text-xs mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — student image */}
        <div
          className={`order-1 lg:order-2 flex items-center justify-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="relative w-72 h-72 sm:w-[28rem] sm:h-[28rem]">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20" />
            <div className="absolute -inset-4 rounded-full bg-cyan-400/5 blur-xl" />
            {/* Image */}
            <div className="absolute inset-5 rounded-full overflow-hidden border-2 border-cyan-400/20 shadow-2xl shadow-blue-950">
              <Image
                src="/studenttop.png"
                alt="Student with robotics"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 240px, 340px"
                priority
                unoptimized
              />
            </div>
            {/* Badge top-right */}
            <div className={`absolute -top-2 right-0 sm:right-4 bg-white rounded-2xl shadow-xl shadow-blue-200/50 px-4 py-2.5 flex items-center gap-2.5 animate-float ${mounted ? "" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #38bdf8, #3b82f6)" }}>
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <div>
                <p className="text-slate-900 font-black text-xs leading-none">Hands-on</p>
                <p className="text-slate-400 text-[10px] mt-0.5">Learning</p>
              </div>
            </div>
            {/* Badge bottom-left */}
            <div className={`absolute -bottom-2 -left-2 sm:-left-4 rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 animate-float ${mounted ? "" : "opacity-0"}`} style={{ animationDelay: "1.2s", background: "linear-gradient(135deg, #0284c7, #22d3ee)" }}>
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-black text-xs leading-none">STEM Skills</p>
                <p className="text-blue-100 text-[10px] mt-0.5">For every child</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1s" }}>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-400/30 to-transparent mx-auto" />
      </div>
    </section>
  );
}
