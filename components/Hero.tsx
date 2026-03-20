"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Single soft glow — no dot grids, no rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="order-2 lg:order-1">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-cyan-400 text-xs font-medium mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Coding · Electronics · Robotics
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            Robotics, Coding{" "}
            <span className="text-cyan-400">&amp; Circuitry</span>
          </h1>

          <p
            className={`text-base text-white/50 max-w-md mb-8 leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            Empowering the next generation of innovators through hands-on robotics, drone building, and coding education across New Brunswick.
          </p>

          <div
            className={`flex flex-wrap gap-3 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <button
              onClick={() => scrollTo("programs")}
              className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold text-sm rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              Explore Programs
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium text-sm rounded-full transition-all duration-200 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* Stats */}
          <div
            className={`flex gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.55s" }}
          >
            {[
              { val: "100+", label: "Students" },
              { val: "75+",  label: "Projects" },
              { val: "3",    label: "Schools" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-white">{s.val}</p>
                <p className="text-white/35 text-xs mt-0.5 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — student image */}
        <div
          className={`order-1 lg:order-2 flex items-center justify-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="relative w-72 h-72 sm:w-[26rem] sm:h-[26rem]">
            {/* Soft ring */}
            <div className="absolute inset-0 rounded-full border border-white/8" />
            {/* Glow */}
            <div className="absolute inset-4 rounded-full bg-cyan-400/8 blur-2xl" />
            {/* Image */}
            <div className="absolute inset-5 rounded-full overflow-hidden border border-white/12 shadow-2xl shadow-slate-950">
              <Image
                src="/studenttop.png"
                alt="Student with robotics"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 240px, 320px"
                priority
                unoptimized
              />
            </div>
            {/* Badge top-right */}
            <div className={`absolute -top-1 right-0 sm:right-2 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float ${mounted ? "" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
              <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <div>
                <p className="text-slate-900 font-bold text-xs leading-none">Hands-on</p>
                <p className="text-slate-400 text-[10px]">Learning</p>
              </div>
            </div>
            {/* Badge bottom-left */}
            <div className={`absolute -bottom-1 left-0 sm:-left-2 bg-blue-600 rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float ${mounted ? "" : "opacity-0"}`} style={{ animationDelay: "1.2s" }}>
              <div className="w-6 h-6 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-xs leading-none">STEM Skills</p>
                <p className="text-blue-300 text-[10px]">For every child</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "1s" }}>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
