"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Pricing",  href: "#pricing" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pillStyle, setPillStyle]     = useState({ left: 0, width: 0 });
  const navRef  = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* ── Active section tracker ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = navLinks.map(l => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Sliding pill position ── */
  useEffect(() => {
    const idx = navLinks.findIndex(l => l.href.replace("#", "") === activeSection);
    const btn = itemRefs.current[idx];
    if (btn && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPillStyle({ left: btnRect.left - navRect.left, width: btnRect.width });
    }
  }, [activeSection]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl shadow-xl shadow-blue-950/40 border-b border-cyan-400/10"
          : "bg-transparent"
      }`}
      style={scrolled ? { background: "linear-gradient(135deg, rgba(7,26,82,0.97), rgba(12,38,108,0.97))" } : {}}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-[70px]">

          {/* Logo */}
          <Link
            href="#home"
            onClick={() => scrollTo("#home")}
            className="flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo variant="white" size="sm" />
          </Link>

          {/* Desktop nav */}
          <div ref={navRef} className="hidden md:flex items-center relative">
            {/* Sliding pill */}
            <div
              className="absolute h-8 bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />

            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.label}
                  ref={el => { itemRefs.current[i] = el; }}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer rounded-full ${
                    isActive ? "text-cyan-300" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* CTA */}
            <button
              onClick={() => scrollTo("#contact")}
              className="ml-4 inline-flex items-center gap-1.5 px-6 py-2.5 font-black text-sm rounded-2xl transition-all duration-200 hover:scale-110 shadow-lg shadow-cyan-500/30 cursor-pointer text-blue-950"
              style={{ background: "linear-gradient(135deg, #22d3ee, #38bdf8)" }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
                <path d="m12 15-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
              </svg>
              Enrol Now
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="backdrop-blur-xl rounded-2xl mb-4 p-2 flex flex-col gap-1 border border-cyan-400/15 shadow-2xl" style={{ background: "linear-gradient(135deg, rgba(7,26,82,0.98), rgba(12,38,108,0.98))" }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "text-cyan-300 bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />}
                  {link.label}
                </button>
              );
            })}
            <div className="px-2 pt-1 pb-1">
              <button
                onClick={() => scrollTo("#contact")}
                className="w-full py-3 font-bold rounded-xl text-sm cursor-pointer transition-all duration-200 hover:scale-105 text-blue-950"
              style={{ background: "linear-gradient(135deg, #22d3ee, #38bdf8)" }}
              >
                Enrol Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
