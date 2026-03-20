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
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800"
    >
      {/* Blobs */}
      <div className="absolute top-[-8%] left-[-8%] w-80 h-80 bg-cyan-500/15 rounded-full animate-blob" style={{ filter: "blur(55px)" }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/15 rounded-full animate-blob" style={{ filter: "blur(60px)", animationDelay: "2s" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Floating rings */}
      {mounted && (
        <>
          <div className="absolute top-24 left-1/2 w-20 h-20 border border-cyan-400/20 rounded-full animate-float opacity-50" />
          <div className="absolute bottom-40 left-8 w-12 h-12 border border-blue-400/25 rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }} />
          <div className="absolute top-36 left-8 w-5 h-5 bg-cyan-400/25 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

        {/* LEFT: Text */}
        <div className="order-2 lg:order-1">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse" />
            Coding &nbsp;·&nbsp; Electronics &nbsp;·&nbsp; Robotics
          </div>

          <h1
            className={`text-4xl sm:text-5xl font-black text-white leading-[1.1] mb-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.2s" }}
          >
            Robotics, Coding,{" "}
            <span className="text-cyan-400">Circuitry</span>
          </h1>

          <p
            className={`text-lg font-semibold text-white/70 mb-4 tracking-wide transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.3s" }}
          >
            Passion, Imagination, Resilience
          </p>

          <p
            className={`text-sm text-white/50 max-w-md mb-8 leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.4s" }}
          >
            Empowering the next generation of innovators through hands-on robotics, drone building, and coding education across New Brunswick.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.5s" }}
          >
            <button
              onClick={() => scrollTo("programs")}
              className="px-7 py-3 bg-cyan-400 hover:bg-cyan-300 text-blue-900 font-bold text-sm rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              Explore Programs
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3 bg-transparent hover:bg-white/8 text-white font-semibold text-sm rounded-full border border-white/30 hover:border-white/60 transition-all duration-200 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* Stats */}
          <div
            className={`flex gap-8 mt-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.65s" }}
          >
            <div>
              <p className="text-3xl font-black text-white leading-none">100+</p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Total Students</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-3xl font-black text-white leading-none">75+</p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Projects Completed</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-3xl font-black text-white leading-none">3</p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">Partner Schools</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Student image */}
        <div
          className={`order-1 lg:order-2 flex items-center justify-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="relative w-80 h-80 sm:w-[28rem] sm:h-[28rem]">
            {/* Outer spinning dashed ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/25 animate-spin" style={{ animationDuration: "20s" }} />
            {/* Inner ring */}
            <div className="absolute inset-4 rounded-full border border-white/10" />
            {/* Glow */}
            <div className="absolute inset-6 rounded-full bg-cyan-400/10 blur-xl" />
            {/* Image */}
            <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-cyan-400/20 shadow-2xl shadow-cyan-900/50">
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
            <div className="absolute -top-2 -right-2 sm:top-2 sm:right-0 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: "0.3s" }}>
              <div className="w-6 h-6 bg-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <div>
                <p className="text-blue-900 font-black text-xs leading-none">Hands-on</p>
                <p className="text-gray-400 text-[10px]">Learning</p>
              </div>
            </div>

            {/* Badge bottom-left */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:-left-4 bg-blue-700 rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: "1.2s" }}>
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-black text-xs leading-none">STEM Skills</p>
                <p className="text-blue-300 text-[10px]">For every child</p>
              </div>
            </div>

            {/* Dot accents */}
            <div className="absolute top-8 -left-3 w-3 h-3 rounded-full bg-cyan-400/60 animate-float" style={{ animationDelay: "0.7s" }} />
            <div className="absolute bottom-12 -right-2 w-2 h-2 rounded-full bg-white/30 animate-float" style={{ animationDelay: "1.5s" }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "1s" }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
